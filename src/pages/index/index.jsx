import { useState, useEffect } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import { navigateTo, showModal } from '@tarojs/taro'
import ColorCard from '../../components/ColorCard'
import './index.css'

export default function Index() {
  const [luckyColor, setLuckyColor] = useState(null)
  const [quote, setQuote] = useState('')
  const [date, setDate] = useState('')

  // 幸运色数据
  const colorData = [
    { 
      name: '元气橙', 
      hex: '#FF6B35', 
      rgb: '255, 107, 53',
      meaning: '充满活力与创造力',
      emoji: '🔆',
      tips: '今天适合开始新项目',
      mood: '积极乐观'
    },
    { 
      name: '宁静蓝', 
      hex: '#4A90E2', 
      rgb: '74, 144, 226',
      meaning: '平静与专注',
      emoji: '🌊',
      tips: '适合处理复杂工作',
      mood: '平和专注'
    },
    { 
      name: '治愈绿', 
      hex: '#00B894', 
      rgb: '0, 184, 148',
      meaning: '治愈与平衡',
      emoji: '🌿',
      tips: '与大自然接触会带来好运',
      mood: '轻松愉悦'
    },
    { 
      name: '浪漫粉', 
      hex: '#FD79A8', 
      rgb: '253, 121, 168',
      meaning: '爱与浪漫',
      emoji: '💖',
      tips: '适合表达情感',
      mood: '温柔浪漫'
    },
    { 
      name: '智慧紫', 
      hex: '#9B59B6', 
      rgb: '155, 89, 182',
      meaning: '智慧与灵感',
      emoji: '🔮',
      tips: '今天灵感爆棚',
      mood: '富有创意'
    }
  ]

  // 名言数据
  const quotes = [
    "颜色是微笑的自然界",
    "生活中的色彩，由你定义",
    "今天的好运色正在守护你",
    "让颜色点亮你的每一天",
    "每个颜色都有它的故事"
  ]

  // 初始化获取幸运色
  useEffect(() => {
    generateLuckyColor()
    const today = new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
    setDate(today)
  }, [])

  // 生成幸运色
  const generateLuckyColor = () => {
    const randomColor = colorData[Math.floor(Math.random() * colorData.length)]
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setLuckyColor(randomColor)
    setQuote(randomQuote)
    
    // 保存到本地
    const history = wx.getStorageSync('colorHistory') || []
    history.unshift({
      color: randomColor,
      date: new Date().toISOString()
    })
    wx.setStorageSync('colorHistory', history.slice(0, 30)) // 保留最近30条
  }

  // 分享功能
  const onShare = () => {
    if (!luckyColor) return
    showModal({
      title: '分享你的幸运色',
      content: `我的今日幸运色是：${luckyColor.name} ${luckyColor.emoji}\n${luckyColor.meaning}`,
      showCancel: true,
      confirmText: '分享好友',
      success: (res) => {
        if (res.confirm) {
          // 这里可以调用微信分享API
          console.log('分享给好友')
          wx.shareAppMessage({
            title: `我的幸运色：${luckyColor.name}`,
            path: `/pages/color-detail/index?color=${encodeURIComponent(JSON.stringify(luckyColor))}`
          })
        }
      }
    })
  }

  return (
    <View className="index-page">
      {/* 顶部装饰 */}
      <View className="header">
        <Text className="title">今日幸运色</Text>
        <Text className="date">{date}</Text>
      </View>

      {/* 名言展示 */}
      <View className="quote-card">
        <Text className="quote-text">"{quote}"</Text>
      </View>

      {/* 幸运色展示区域 */}
      {luckyColor && (
        <View className="color-display">
          <View 
            className="color-preview" 
            style={{ backgroundColor: luckyColor.hex }}
          >
            <Text className="color-emoji">{luckyColor.emoji}</Text>
            <Text className="color-name">{luckyColor.name}</Text>
            {/* <Text className="color-hex">{luckyColor.hex}</Text> */}
          </View>

          <ColorCard color={luckyColor} />

          {/* 互动按钮 */}
          <View className="action-buttons">
            <Button 
              className="btn-generate" 
              onClick={generateLuckyColor}
            >
              换一个颜色
            </Button>
            <Button 
              className="btn-share" 
              onClick={onShare}
            >
              分享好运 💫
            </Button>
            <Button 
              className="btn-detail" 
              onClick={() => navigateTo({
                url: `/pages/color-detail/index?color=${encodeURIComponent(JSON.stringify(luckyColor))}`
              })}
            >
              查看详情 📖
            </Button>
          </View>
        </View>
      )}

      {/* 功能入口 */}
      <View className="feature-grid">
        <View 
          className="feature-item"
          onClick={() => navigateTo({ url: '/pages/my-colors/index' })}
        >
          <Text className="feature-icon">📚</Text>
          <Text className="feature-text">我的记录</Text>
        </View>
        <View 
          className="feature-item"
          onClick={() => showModal({
            title: '颜色测试',
            content: '看看你的性格颜色是什么？',
            success: (res) => {
              if (res.confirm) {
                // 这里可以切换页面
                navigateTo({ url: '/pages/color-test/index' })
              }
            }
          })}
        >
          <Text className="feature-icon">🧪</Text>
          <Text className="feature-text">颜色测试</Text>
        </View>
        <View 
          className="feature-item"
          onClick={() => showModal({
            title: '颜色搭配',
            content: '学习颜色搭配技巧',
            success: (res) => {
              if (res.confirm) {
                // 这里可以切换页面
                navigateTo({ url: '/pages/color-guide/index' })
              }
            }
          })}
        >
          <Text className="feature-icon">🎨</Text>
          <Text className="feature-text">搭配指南</Text>
        </View>
      </View>

      {/* 小贴士 */}
      <View className="tips">
        <Text className="tips-title">💡 小贴士</Text>
        <Text className="tips-content">
          试试将幸运色应用到穿搭、手机壁纸或工作笔记中，让好运伴随一整天！
        </Text>
      </View>
    </View>
  )
}