import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button, Image } from '@tarojs/components'
import { getCurrentInstance, navigateBack, showModal, showToast } from '@tarojs/taro'
import './index.css'

export default function ColorDetail() {
  const [color, setColor] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [similarColors, setSimilarColors] = useState([])
  const [colorHistory, setColorHistory] = useState([])

  // 相似颜色数据
  const colorPalette = {
    '元气橙': [
      { name: '珊瑚橙', hex: '#FF8C69', meaning: '温暖亲切' },
      { name: '日落橙', hex: '#FF7F50', meaning: '热情奔放' },
      { name: '杏色', hex: '#F4A460', meaning: '柔和温馨' }
    ],
    '宁静蓝': [
      { name: '天蓝色', hex: '#87CEEB', meaning: '清新自由' },
      { name: '钴蓝色', hex: '#0047AB', meaning: '深邃冷静' },
      { name: '灰蓝色', hex: '#6699CC', meaning: '沉稳理性' }
    ],
    '治愈绿': [
      { name: '薄荷绿', hex: '#98FF98', meaning: '清爽活力' },
      { name: '橄榄绿', hex: '#808000', meaning: '平和稳重' },
      { name: '翡翠绿', hex: '#50C878', meaning: '珍贵优雅' }
    ],
    '浪漫粉': [
      { name: '樱花粉', hex: '#FFB7C5', meaning: '温柔浪漫' },
      { name: '蔷薇粉', hex: '#FF69B4', meaning: '热情甜美' },
      { name: '珊瑚粉', hex: '#F88379', meaning: '活泼可爱' }
    ],
    '智慧紫': [
      { name: '薰衣草紫', hex: '#E6E6FA', meaning: '神秘优雅' },
      { name: '紫罗兰', hex: '#8A2BE2', meaning: '高贵华丽' },
      { name: '丁香紫', hex: '#C8A2C8', meaning: '梦幻温柔' }
    ]
  }

  // 颜色应用场景
  const applicationScenes = [
    {
      title: '穿搭建议',
      icon: '👕',
      tips: [
        '作为配饰点缀整体造型',
        '选择同色系深浅搭配',
        '尝试与互补色撞色'
      ]
    },
    {
      title: '家居布置',
      icon: '🏠',
      tips: [
        '作为墙面或窗帘颜色',
        '通过软装添加颜色元素',
        '搭配中性色平衡视觉'
      ]
    },
    {
      title: '心理影响',
      icon: '🧠',
      tips: [
        '有助于调节情绪状态',
        '提升创造力和专注力',
        '影响他人对你的印象'
      ]
    },
    {
      title: '数字应用',
      icon: '📱',
      tips: [
        '用作手机壁纸主色调',
        '社交媒体封面设计',
        'PPT和文档配色方案'
      ]
    }
  ]

  useEffect(() => {
    const params = getCurrentInstance().router?.params
    if (params?.color) {
      try {
        const colorData = JSON.parse(decodeURIComponent(params.color))
        setColor(colorData)
        loadRelatedData(colorData)
        checkFavorite(colorData)
      } catch (error) {
        console.error('解析颜色数据失败:', error)
        showToast({
          title: '数据加载失败',
          icon: 'error'
        })
        setTimeout(() => navigateBack(), 1500)
      }
    } else {
      navigateBack()
    }
  }, [])

  // 加载相关数据
  const loadRelatedData = (colorData) => {
    // 获取相似颜色
    if (colorData.name in colorPalette) {
      setSimilarColors(colorPalette[colorData.name])
    }

    // 获取历史记录
    const history = wx.getStorageSync('colorHistory') || []
    setColorHistory(history.slice(0, 5))
  }

  // 检查是否收藏
  const checkFavorite = (colorData) => {
    const favorites = wx.getStorageSync('colorFavorites') || []
    const isFav = favorites.some(fav => 
      fav.name === colorData.name && fav.hex === colorData.hex
    )
    setIsFavorite(isFav)
  }

  // 收藏/取消收藏
  const toggleFavorite = () => {
    const favorites = wx.getStorageSync('colorFavorites') || []
    
    if (isFavorite) {
      // 取消收藏
      const newFavorites = favorites.filter(fav => 
        !(fav.name === color.name && fav.hex === color.hex)
      )
      wx.setStorageSync('colorFavorites', newFavorites)
      setIsFavorite(false)
      showToast({
        title: '已取消收藏',
        icon: 'success'
      })
    } else {
      // 添加收藏
      favorites.unshift({
        ...color,
        favoriteDate: new Date().toISOString()
      })
      wx.setStorageSync('colorFavorites', favorites)
      setIsFavorite(true)
      showToast({
        title: '收藏成功',
        icon: 'success'
      })
    }
  }

  // 复制颜色值
  const copyColorCode = (code, type) => {
    wx.setClipboardData({
      data: code,
      success: () => {
        showToast({
          title: `${type}已复制`,
          icon: 'success'
        })
      }
    })
  }

  // 分享颜色
  const shareColor = () => {
    showModal({
      title: '分享这个颜色',
      content: `分享「${color.name}」${color.emoji}\n${color.meaning}\nHEX: ${color.hex}`,
      showCancel: true,
      confirmText: '分享',
      success: (res) => {
        if (res.confirm) {
          // 这里可以调用微信分享API
          wx.shareAppMessage({
            title: `我的幸运色：${color.name}`,
            path: `/pages/color-detail/index?color=${encodeURIComponent(JSON.stringify(color))}`
          })
        }
      }
    })
  }

  // 保存到相册（模拟）
  const saveToAlbum = () => {
    showModal({
      title: '保存颜色卡片',
      content: '将生成一张精美的颜色卡片，可以保存到相册分享给朋友',
      showCancel: true,
      confirmText: '生成卡片',
      success: (res) => {
        if (res.confirm) {
          // 这里可以实现生成图片的功能
          showToast({
            title: '卡片已保存',
            icon: 'success'
          })
        }
      }
    })
  }

  // 应用该颜色
  const applyColor = () => {
    showModal({
      title: '应用这个颜色',
      content: '选择如何使用这个颜色：',
      showCancel: true,
      confirmText: '设为壁纸',
      cancelText: '穿搭灵感',
      success: (res) => {
        if (res.confirm) {
          showToast({
            title: '已设置为建议壁纸',
            icon: 'success'
          })
        } else if (res.cancel) {
          showModal({
            title: '穿搭灵感',
            content: `${color.name}适合搭配：白色、黑色、灰色等中性色，或者尝试与互补色创造视觉冲击。`,
            showCancel: false,
            confirmText: '知道了'
          })
        }
      }
    })
  }

  if (!color) {
    return (
      <View className="loading-container">
        <View className="loading-spinner"></View>
        <Text className="loading-text">加载中...</Text>
      </View>
    )
  }

  return (
    <View className="color-detail-page">
      {/* 头部颜色展示区域 */}
      <View className="color-header" style={{ backgroundColor: color.hex }}>
        <View className="header-overlay">
          {/* <View className="back-btn" onClick={navigateBack}>
            <Text className="back-icon">‹</Text>
          </View> */}
          
          <View className="color-info">
            <Text className="color-emoji">{color.emoji}</Text>
            <Text className="color-name">{color.name}</Text>
            <Text className="color-meaning">{color.meaning}</Text>
          </View>

          <View className="header-actions">
            <View 
              className={`action-btn ${isFavorite ? 'active' : ''}`} 
              onClick={toggleFavorite}
            >
              <Text className="action-icon" style={{textIndent: '-4px'}}>{isFavorite ? '❤️' : '🤍'}</Text>
            </View>
            <View className="action-btn" onClick={shareColor}>
              <Text className="action-icon">✨</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="content-container" scrollY>
        {/* 颜色代码区域 */}
        <View className="color-codes-section">
          <Text className="section-title">颜色代码</Text>
          <View className="codes-grid">
            <View 
              className="code-item"
              onClick={() => copyColorCode(color.hex, 'HEX代码')}
            >
              <Text className="code-type">HEX</Text>
              <Text className="code-value">{color.hex}</Text>
              <Text className="copy-hint">点击复制</Text>
            </View>
            <View 
              className="code-item"
              onClick={() => copyColorCode(color.rgb, 'RGB代码')}
            >
              <Text className="code-type">RGB</Text>
              <Text className="code-value">{color.rgb}</Text>
              <Text className="copy-hint">点击复制</Text>
            </View>
            <View className="code-item">
              <Text className="code-type">情绪</Text>
              <Text className="code-value">{color.mood}</Text>
            </View>
          </View>
        </View>

        {/* 颜色描述 */}
        <View className="description-section">
          <Text className="section-title">颜色描述</Text>
          <View className="description-card">
            <Text className="description-text">
              {color.name}是一种{color.meaning}的颜色。{color.tips}
              这种颜色常被用于表达{color.mood}的情绪，在日常生活中广泛使用。
            </Text>
          </View>
        </View>

        {/* 相似颜色 */}
        <View className="similar-colors-section">
          <Text className="section-title">相似颜色</Text>
          <ScrollView className="similar-colors-list" scrollX>
            {similarColors.map((similar, index) => (
              <View 
                key={index}
                className="similar-color-item"
                style={{ backgroundColor: similar.hex }}
                onClick={() => copyColorCode(similar.hex, '颜色代码')}
              >
                <View className="similar-color-overlay">
                  <Text className="similar-color-name">{similar.name}</Text>
                  <Text className="similar-color-meaning">{similar.meaning}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 应用场景 */}
        <View className="application-section">
          <Text className="section-title">应用场景</Text>
          <View className="scenes-grid">
            {applicationScenes.map((scene, index) => (
              <View key={index} className="scene-card">
                <Text className="scene-icon">{scene.icon}</Text>
                <Text className="scene-title">{scene.title}</Text>
                <View className="scene-tips">
                  {scene.tips.map((tip, tipIndex) => (
                    <Text key={tipIndex} className="scene-tip">
                      • {tip}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 操作按钮 */}
        <View className="action-buttons">
          <Button 
            className="action-btn primary"
            onClick={applyColor}
          >
            <Text className="btn-text">应用这个颜色</Text>
            <Text className="btn-emoji">🎨</Text>
          </Button>
          <Button 
            className="action-btn secondary"
            onClick={saveToAlbum}
          >
            <Text className="btn-text">保存卡片</Text>
            <Text className="btn-emoji">📸</Text>
          </Button>
        </View>

        {/* 近期记录 */}
        {colorHistory.length > 0 && (
          <View className="recent-section">
            <Text className="section-title">近期幸运色</Text>
            <View className="recent-colors">
              {colorHistory.map((item, index) => (
                <View 
                  key={index}
                  className="recent-color-dot"
                  style={{ backgroundColor: item.color.hex }}
                  onClick={() => copyColorCode(item.color.hex, '颜色代码')}
                >
                  <Text className="recent-emoji">{item.color.emoji}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}