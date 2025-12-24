import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button, Image } from '@tarojs/components'
import { navigateTo, showModal, showToast } from '@tarojs/taro'
import './index.css'

export default function ColorGuide() {
  const [activeTab, setActiveTab] = useState('theory')
  const [favorites, setFavorites] = useState([])
  const [currentPalette, setCurrentPalette] = useState(null)

  // 颜色搭配理论
  const colorTheories = [
    {
      id: 'complementary',
      title: '互补色搭配',
      emoji: '🎯',
      description: '色相环上相对的两种颜色，形成强烈对比',
      colors: ['#FF6B6B', '#4ECDC4'],
      theory: '互补色搭配能创造强烈的视觉冲击，适合需要突出对比的场景',
      tips: [
        '建议使用一种颜色作为主色，另一种作为点缀',
        '避免两种颜色面积相等',
        '适合用在按钮、图标等需要强调的元素'
      ],
      examples: ['品牌标识', '促销海报', '重点按钮']
    },
    {
      id: 'analogous',
      title: '类似色搭配',
      emoji: '🌈',
      description: '色相环上相邻的三种颜色，和谐自然',
      colors: ['#FF9A8B', '#FF6B6B', '#FF8E53'],
      theory: '类似色搭配非常和谐，容易营造统一感',
      tips: [
        '选择一种主色，其他作为辅助色',
        '非常适合创建渐变效果',
        '保持颜色的饱和度相近'
      ],
      examples: ['APP界面', '网站设计', '渐变背景']
    },
    {
      id: 'triadic',
      title: '三角色搭配',
      emoji: '🔺',
      description: '色相环上等距的三种颜色，平衡而生动',
      colors: ['#FF6B6B', '#4ECDC4', '#FFD166'],
      theory: '三角色搭配既有对比又保持平衡',
      tips: [
        '让一种颜色占主导，其他两种点缀',
        '适合活泼、有活力的设计',
        '注意控制颜色的亮度和饱和度'
      ],
      examples: ['儿童产品', '活动页面', '游戏界面']
    },
    {
      id: 'monochromatic',
      title: '单色系搭配',
      emoji: '🎨',
      description: '同一色相的不同明度和饱和度',
      colors: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350'],
      theory: '通过明度和饱和度变化创造层次感',
      tips: [
        '使用5-7个不同深浅的颜色',
        '注意颜色的可读性',
        '非常适合简约风格设计'
      ],
      examples: ['商务PPT', '极简网站', 'UI组件']
    },
    {
      id: 'split-complementary',
      title: '分裂互补色',
      emoji: '✌️',
      description: '一种颜色加上其互补色相邻的两种颜色',
      colors: ['#4ECDC4', '#FF8E53', '#FFD166'],
      theory: '比互补色更柔和，既有对比又不失和谐',
      tips: [
        '主色可以稍微鲜艳',
        '辅助色选择柔和的色调',
        '适合需要平衡对比与和谐的场景'
      ],
      examples: ['博客设计', '作品集', '电商页面']
    }
  ]

  // 实用配色方案
  const practicalPalettes = [
    {
      id: 1,
      name: '自然清新',
      emoji: '🌿',
      mood: '平静、自然、舒适',
      colors: ['#A8E6CF', '#DCEDC1', '#FFD3B6', '#FFAAA5', '#FF8B94'],
      usage: '健康类APP、环保品牌、家居设计',
      description: '灵感来自大自然，给人宁静舒适的感觉'
    },
    {
      id: 2,
      name: '活力热情',
      emoji: '🔥',
      mood: '热情、活力、创意',
      colors: ['#FF6B6B', '#FF8E53', '#FFD166', '#06D6A0', '#118AB2'],
      usage: '运动品牌、儿童产品、创意工作室',
      description: '充满活力的色彩组合，激发创意和热情'
    },
    {
      id: 3,
      name: '商务专业',
      emoji: '💼',
      mood: '专业、稳重、可靠',
      colors: ['#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7', '#ECF0F1'],
      usage: '企业网站、商务应用、金融产品',
      description: '稳重专业的色彩，适合商务场景'
    },
    {
      id: 4,
      name: '浪漫温柔',
      emoji: '💝',
      mood: '浪漫、温柔、梦幻',
      colors: ['#FFB7C5', '#E6B8B8', '#FFE4E1', '#FFF0F5', '#F8F8FF'],
      usage: '女性产品、婚礼设计、美妆品牌',
      description: '柔和的粉色系，营造浪漫氛围'
    },
    {
      id: 5,
      name: '科技未来',
      emoji: '🚀',
      mood: '科技、未来、创新',
      colors: ['#0A2463', '#3E92CC', '#FFFAFF', '#D8315B', '#1E1B18'],
      usage: '科技产品、游戏界面、数字艺术',
      description: '充满科技感的色彩搭配'
    },
    {
      id: 6,
      name: '复古怀旧',
      emoji: '📻',
      mood: '复古、怀旧、艺术',
      colors: ['#8A4F7D', '#887880', '#88A096', '#BBAB9B', '#D0B090'],
      usage: '复古风格、艺术展览、咖啡馆',
      description: '灵感来自复古色调，充满艺术气息'
    }
  ]

  // 颜色应用案例
  const applicationCases = [
    {
      id: 1,
      title: 'APP界面设计',
      emoji: '📱',
      palettes: [
        {
          name: '主色',
          colors: ['#4ECDC4', '#FFD166'],
          usage: '品牌色、主要按钮'
        },
        {
          name: '辅助色',
          colors: ['#FF6B6B', '#06D6A0'],
          usage: '次要按钮、图标'
        },
        {
          name: '中性色',
          colors: ['#2C3E50', '#7F8C8D', '#ECF0F1'],
          usage: '文字、背景、边框'
        }
      ],
      tips: [
        '保持一致性，整个APP使用相同的配色方案',
        '主色不超过2种，避免色彩混乱',
        '确保足够的对比度，方便阅读'
      ]
    },
    {
      id: 2,
      title: '网页设计',
      emoji: '💻',
      palettes: [
        {
          name: '品牌色',
          colors: ['#FF6B6B', '#4ECDC4'],
          usage: 'Logo、主导航、重要按钮'
        },
        {
          name: '强调色',
          colors: ['#FFD166', '#118AB2'],
          usage: '悬浮效果、提示信息'
        },
        {
          name: '背景色',
          colors: ['#FFFFFF', '#F8F9FA', '#2C3E50'],
          usage: '页面背景、卡片背景'
        }
      ],
      tips: [
        '响应式设计时，确保颜色在不同设备上显示一致',
        '深色模式需要特殊的配色方案',
        '考虑色盲用户的可访问性'
      ]
    },
    {
      id: 3,
      title: '平面设计',
      emoji: '🖼️',
      palettes: [
        {
          name: '主色调',
          colors: ['#9B59B6', '#3498DB'],
          usage: '标题、重要图形'
        },
        {
          name: '辅助色调',
          colors: ['#E74C3C', '#2ECC71'],
          usage: '装饰元素、次要信息'
        },
        {
          name: '背景色调',
          colors: ['#ECF0F1', '#BDC3C7'],
          usage: '背景、文字区域'
        }
      ],
      tips: [
        '印刷品需要考虑CMYK色彩模式',
        '不同纸张材质会影响颜色效果',
        '留白也很重要，不要用色过满'
      ]
    }
  ]

  // 颜色工具
  const colorTools = [
    {
      name: '对比度检查',
      emoji: '👁️',
      description: '检查两种颜色的对比度是否符合可访问性标准',
      action: () => showModal({
        title: '对比度检查',
        content: '选择两种颜色，系统会检查它们的对比度是否足够。建议文本和背景的对比度至少达到4.5:1。',
        showCancel: false,
        confirmText: '明白了'
      })
    },
    {
      name: '颜色提取',
      emoji: '🧪',
      description: '从图片中提取主要颜色',
      action: () => showModal({
        title: '颜色提取',
        content: '上传图片，系统会自动分析并提取图片中的主要颜色。',
        showCancel: false,
        confirmText: '明白了'
      })
    },
    {
      name: '渐变色生成',
      emoji: '🔮',
      description: '生成漂亮的渐变色方案',
      action: () => showModal({
        title: '渐变色生成',
        content: '选择2-3种颜色，系统会生成平滑的渐变色。',
        showCancel: false,
        confirmText: '明白了'
      })
    }
  ]

  useEffect(() => {
    // 加载收藏的配色方案
    const savedFavorites = wx.getStorageSync('colorFavorites') || []
    setFavorites(savedFavorites)
    
    // 设置默认展示的配色方案
    setCurrentPalette(practicalPalettes[0])
  }, [])

  // 切换标签页
  const switchTab = (tab) => {
    setActiveTab(tab)
  }

  // 收藏配色方案
  const toggleFavorite = (palette) => {
    const newFavorites = [...favorites]
    const index = newFavorites.findIndex(fav => fav.id === palette.id)
    
    if (index > -1) {
      // 取消收藏
      newFavorites.splice(index, 1)
      showToast({
        title: '已取消收藏',
        icon: 'success'
      })
    } else {
      // 添加收藏
      newFavorites.push({
        ...palette,
        favoriteDate: new Date().toISOString()
      })
      showToast({
        title: '已收藏',
        icon: 'success'
      })
    }
    
    setFavorites(newFavorites)
    wx.setStorageSync('colorFavorites', newFavorites)
  }

  // 检查是否已收藏
  const isFavorite = (palette) => {
    return favorites.some(fav => fav.id === palette.id)
  }

  // 复制颜色代码
  const copyColor = (color) => {
    wx.setClipboardData({
      data: color,
      success: () => {
        showToast({
          title: '颜色已复制',
          icon: 'success'
        })
      }
    })
  }

  // 预览配色方案
  const previewPalette = (palette) => {
    setCurrentPalette(palette)
  }

  // 应用配色方案
  const applyPalette = (palette) => {
    showModal({
      title: '应用配色方案',
      content: `确定要将「${palette.name}」应用到当前设计吗？`,
      showCancel: true,
      confirmText: '应用',
      success: (res) => {
        if (res.confirm) {
          showToast({
            title: '已应用配色方案',
            icon: 'success'
          })
          // 这里可以保存当前选择的配色方案
          wx.setStorageSync('currentPalette', palette)
        }
      }
    })
  }

  // 查看详情
  const viewDetail = (palette) => {
    navigateTo({
      url: `/pages/color-detail/index?color=${encodeURIComponent(JSON.stringify({
        name: palette.name,
        hex: palette.colors[0],
        meaning: palette.mood,
        emoji: palette.emoji,
        description: palette.description
      }))}`
    })
  }

  // 生成随机配色
  const generateRandomPalette = () => {
    const randomIndex = Math.floor(Math.random() * practicalPalettes.length)
    setCurrentPalette(practicalPalettes[randomIndex])
    
    showToast({
      title: '已随机生成配色',
      icon: 'success'
    })
  }

  return (
    <View className="color-guide-page">
      {/* 顶部标题 */}
      <View className="guide-header">
        <Text className="guide-title">颜色搭配指南</Text>
        <Text className="guide-subtitle">设计师的专业配色方案</Text>
      </View>

      {/* 标签页导航 */}
      <View className="tab-navigation">
        <View 
          className={`tab-item ${activeTab === 'theory' ? 'active' : ''}`}
          onClick={() => switchTab('theory')}
        >
          <Text className="tab-emoji">🎨</Text>
          <Text className="tab-text">搭配理论</Text>
        </View>
        <View 
          className={`tab-item ${activeTab === 'practical' ? 'active' : ''}`}
          onClick={() => switchTab('practical')}
        >
          <Text className="tab-emoji">🌈</Text>
          <Text className="tab-text">实用方案</Text>
        </View>
        <View 
          className={`tab-item ${activeTab === 'cases' ? 'active' : ''}`}
          onClick={() => switchTab('cases')}
        >
          <Text className="tab-emoji">💡</Text>
          <Text className="tab-text">应用案例</Text>
        </View>
      </View>

      <ScrollView className="guide-content" scrollY>
        {activeTab === 'theory' && (
          <View className="theory-section">
            <Text className="section-title">颜色搭配理论</Text>
            <Text className="section-description">
              掌握基本的颜色搭配理论，让你的设计更具专业感
            </Text>

            {colorTheories.map((theory, index) => (
              <View key={theory.id} className="theory-card">
                <View className="card-header">
                  <Text className="theory-emoji">{theory.emoji}</Text>
                  <View className="theory-info">
                    <Text className="theory-title">{theory.title}</Text>
                    <Text className="theory-desc">{theory.description}</Text>
                  </View>
                </View>

                {/* 颜色展示 */}
                <View className="color-display">
                  {theory.colors.map((color, colorIndex) => (
                    <View 
                      key={colorIndex}
                      className="color-block"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color)}
                    >
                      <Text className="color-code">{color}</Text>
                    </View>
                  ))}
                </View>

                {/* 理论说明 */}
                <View className="theory-content">
                  <Text className="content-title">理论说明</Text>
                  <Text className="content-text">{theory.theory}</Text>
                </View>

                {/* 使用技巧 */}
                <View className="theory-tips">
                  <Text className="tips-title">💡 使用技巧</Text>
                  {theory.tips.map((tip, tipIndex) => (
                    <View key={tipIndex} className="tip-item">
                      <Text className="tip-bullet">•</Text>
                      <Text className="tip-text">{tip}</Text>
                    </View>
                  ))}
                </View>

                {/* 适用场景 */}
                <View className="theory-examples">
                  <Text className="examples-title">🎯 适用场景</Text>
                  <View className="examples-tags">
                    {theory.examples.map((example, exampleIndex) => (
                      <View key={exampleIndex} className="example-tag">
                        <Text className="example-text">{example}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'practical' && (
          <View className="practical-section">
            <Text className="section-title">实用配色方案</Text>
            <Text className="section-description">
              精心设计的配色方案，可直接应用于项目
            </Text>

            {/* 当前选中的配色方案预览 */}
            {currentPalette && (
              <View className="current-palette">
                <View className="palette-header">
                  <View className="palette-info">
                    <Text className="palette-emoji">{currentPalette.emoji}</Text>
                    <View>
                      <Text className="palette-name">{currentPalette.name}</Text>
                      <Text className="palette-mood">{currentPalette.mood}</Text>
                    </View>
                  </View>
                  <View className="palette-actions">
                    <View 
                      className={`favorite-btn ${isFavorite(currentPalette) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(currentPalette)}
                    >
                      <Text className="favorite-icon">
                        {isFavorite(currentPalette) ? '❤️' : '🤍'}
                      </Text>
                    </View>
                    <Button 
                      className="apply-btn"
                      onClick={() => applyPalette(currentPalette)}
                    >
                      应用方案
                    </Button>
                  </View>
                </View>

                {/* 颜色展示 */}
                <View className="palette-colors">
                  {currentPalette.colors.map((color, index) => (
                    <View 
                      key={index}
                      className="palette-color"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColor(color)}
                    >
                      <Text className="palette-hex">{color}</Text>
                    </View>
                  ))}
                </View>

                <View className="palette-details">
                  <Text className="detail-title">方案描述</Text>
                  <Text className="detail-text">{currentPalette.description}</Text>
                  <Text className="detail-title">适用场景</Text>
                  <Text className="detail-text">{currentPalette.usage}</Text>
                </View>
              </View>
            )}

            {/* 配色方案列表 */}
            <Text className="subsection-title">更多配色方案</Text>
            <View className="palettes-grid">
              {practicalPalettes.map((palette) => (
                <View 
                  key={palette.id}
                  className={`palette-card ${currentPalette?.id === palette.id ? 'active' : ''}`}
                  onClick={() => previewPalette(palette)}
                >
                  <View className="card-colors">
                    {palette.colors.slice(0, 4).map((color, index) => (
                      <View 
                        key={index}
                        className="small-color"
                        style={{ backgroundColor: color }}
                      ></View>
                    ))}
                  </View>
                  <View className="card-info">
                    <Text className="card-name">{palette.name}</Text>
                    <Text className="card-emoji">{palette.emoji}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* 操作按钮 */}
            <View className="action-buttons">
              <Button className="action-btn random" onClick={generateRandomPalette}>
                🎲 随机配色
              </Button>
              <Button 
                className="action-btn favorites"
                onClick={() => console.log('/pages/favorites/index')}
              >
                ❤️ 我的收藏
              </Button>
            </View>
          </View>
        )}

        {activeTab === 'cases' && (
          <View className="cases-section">
            <Text className="section-title">应用案例</Text>
            <Text className="section-description">
              不同场景下的专业配色方案
            </Text>

            {applicationCases.map((caseItem) => (
              <View key={caseItem.id} className="case-card">
                <View className="case-header">
                  <Text className="case-emoji">{caseItem.emoji}</Text>
                  <Text className="case-title">{caseItem.title}</Text>
                </View>

                {/* 配色方案展示 */}
                <View className="case-palettes">
                  {caseItem.palettes.map((palette, index) => (
                    <View key={index} className="case-palette">
                      <Text className="palette-name">{palette.name}</Text>
                      <View className="palette-colors">
                        {palette.colors.map((color, colorIndex) => (
                          <View 
                            key={colorIndex}
                            className="case-color"
                            style={{ backgroundColor: color }}
                            onClick={() => copyColor(color)}
                          >
                            <Text className="case-hex">{color}</Text>
                          </View>
                        ))}
                      </View>
                      <Text className="palette-usage">{palette.usage}</Text>
                    </View>
                  ))}
                </View>

                {/* 设计建议 */}
                <View className="case-tips">
                  <Text className="tips-title">📝 设计建议</Text>
                  {caseItem.tips.map((tip, tipIndex) => (
                    <View key={tipIndex} className="case-tip">
                      <Text className="tip-number">{tipIndex + 1}.</Text>
                      <Text className="tip-text">{tip}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            {/* 颜色工具 */}
            <View className="color-tools">
              <Text className="tools-title">🔧 颜色工具</Text>
              <View className="tools-grid">
                {colorTools.map((tool, index) => (
                  <View 
                    key={index}
                    className="tool-card"
                    onClick={tool.action}
                  >
                    <Text className="tool-emoji">{tool.emoji}</Text>
                    <Text className="tool-name">{tool.name}</Text>
                    <Text className="tool-desc">{tool.description}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}