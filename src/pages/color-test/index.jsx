import { useState, useEffect } from 'react'
import { View, Text, Button, ScrollView, Image } from '@tarojs/components'
import { navigateTo, showModal, showToast } from '@tarojs/taro'
import './index.css'

export default function ColorTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [testComplete, setTestComplete] = useState(false)
  const [resultColor, setResultColor] = useState(null)
  const [showResult, setShowResult] = useState(false)

  // 测试题目
  const questions = [
    {
      id: 1,
      question: '选择一个最能代表你当前心情的颜色',
      options: [
        { text: '热情红色 🔥', color: '#FF5252', type: 'passionate' },
        { text: '宁静蓝色 🌊', color: '#4FC3F7', type: 'calm' },
        { text: '活力黄色 🌞', color: '#FFEB3B', type: 'energetic' },
        { text: '自然绿色 🌿', color: '#81C784', type: 'natural' }
      ]
    },
    {
      id: 2,
      question: '你更喜欢的休闲方式是？',
      options: [
        { text: '户外运动 🏃‍♂️', color: '#FF9800', type: 'active' },
        { text: '阅读思考 📚', color: '#9C27B0', type: 'thoughtful' },
        { text: '朋友聚会 👥', color: '#E91E63', type: 'social' },
        { text: '独自放松 🛋️', color: '#607D8B', type: 'relaxed' }
      ]
    },
    {
      id: 3,
      question: '选择一种天气来形容你的性格',
      options: [
        { text: '晴朗阳光 ☀️', color: '#FFC107', type: 'sunny' },
        { text: '细雨绵绵 🌧️', color: '#2196F3', type: 'gentle' },
        { text: '雷雨交加 ⚡', color: '#9C27B0', type: 'intense' },
        { text: '多云微风 ☁️', color: '#BDBDBD', type: 'balanced' }
      ]
    },
    {
      id: 4,
      question: '你理想中的工作环境是？',
      options: [
        { text: '创意自由 🎨', color: '#FF5722', type: 'creative' },
        { text: '井然有序 📊', color: '#3F51B5', type: 'organized' },
        { text: '团队协作 🤝', color: '#4CAF50', type: 'collaborative' },
        { text: '安静独立 🤫', color: '#795548', type: 'independent' }
      ]
    },
    {
      id: 5,
      question: '选择一种动物来代表自己',
      options: [
        { text: '狮子 🦁', color: '#FF9800', type: 'leader' },
        { text: '海豚 🐬', color: '#00BCD4', type: 'intelligent' },
        { text: '鹿 🦌', color: '#8BC34A', type: 'gentle' },
        { text: '猫头鹰 🦉', color: '#673AB7', type: 'wise' }
      ]
    }
  ]

  // 测试结果映射
  const colorResults = {
    passionate: {
      name: '火焰红',
      hex: '#FF5252',
      emoji: '🔥',
      meaning: '热情似火',
      description: '你是一个充满激情和活力的人，像火焰一样热烈而奔放。你热爱生活，勇于追求梦想，总能给人带来温暖和正能量。',
      personality: '外向、热情、有领导力',
      tips: '多尝试需要热情和创造力的工作，保持积极心态'
    },
    calm: {
      name: '宁静蓝',
      hex: '#4FC3F7',
      emoji: '🌊',
      meaning: '平和睿智',
      description: '你像大海一样深沉而平静，遇事冷静，思维清晰。你善于思考，有很强的洞察力，是朋友眼中的智者。',
      personality: '理性、冷静、善于思考',
      tips: '适合需要专注和深度思考的工作，保持内心的平静'
    },
    energetic: {
      name: '活力黄',
      hex: '#FFEB3B',
      emoji: '🌞',
      meaning: '阳光活力',
      description: '你像阳光一样温暖而充满活力，总能带给周围人快乐。你乐观开朗，充满好奇心，永远保持年轻的心态。',
      personality: '乐观、活跃、有创造力',
      tips: '多参与社交活动，发挥你的创造力和感染力'
    },
    natural: {
      name: '森林绿',
      hex: '#81C784',
      emoji: '🌿',
      meaning: '自然和谐',
      description: '你像大自然一样平和而包容，追求与环境的和谐相处。你善良、有爱心，注重生活的平衡和可持续性。',
      personality: '平和、善良、有同理心',
      tips: '多接触大自然，保持生活的平衡和内心的宁静'
    },
    creative: {
      name: '艺术紫',
      hex: '#9C27B0',
      emoji: '🎨',
      meaning: '创意无限',
      description: '你有着丰富的想象力和创造力，总是能想到别人想不到的点子。你独特、有艺术感，喜欢表达自我。',
      personality: '创新、独特、有艺术气质',
      tips: '多尝试艺术创作，发挥你的想象力和创造力'
    }
  }

  // 初始化测试
  useEffect(() => {
    resetTest()
  }, [])

  // 重置测试
  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setTestComplete(false)
    setResultColor(null)
    setShowResult(false)
  }

  // 选择答案
  const selectAnswer = (option) => {
    const newAnswers = [...answers, option]
    setAnswers(newAnswers)

    // 判断是否完成测试
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // 完成测试，计算结果
      calculateResult(newAnswers)
    }
  }

  // 计算测试结果
  const calculateResult = (allAnswers) => {
    // 统计每种类型的出现次数
    const typeCounts = {}
    allAnswers.forEach(answer => {
      typeCounts[answer.type] = (typeCounts[answer.type] || 0) + 1
    })

    // 找出出现最多的类型
    let maxCount = 0
    let resultType = 'natural' // 默认值

    Object.entries(typeCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count
        resultType = type
      }
    })

    // 获取结果颜色
    const result = colorResults[resultType] || colorResults.natural
    setResultColor(result)
    setTestComplete(true)

    // 保存测试结果
    const testHistory = wx.getStorageSync('testHistory') || []
    testHistory.unshift({
      result: result,
      date: new Date().toISOString(),
      answers: allAnswers
    })
    wx.setStorageSync('testHistory', testHistory.slice(0, 20)) // 保留最近20条
  }

  // 显示结果
  const showResultDetails = () => {
    setShowResult(true)
  }

  // 再测一次
  const restartTest = () => {
    resetTest()
  }

  // 分享结果
  const shareResult = () => {
    showModal({
      title: '分享测试结果',
      content: `我的性格颜色是：${resultColor.name} ${resultColor.emoji}\n${resultColor.meaning}`,
      showCancel: true,
      confirmText: '分享',
      success: (res) => {
        if (res.confirm) {
          showToast({
            title: '分享成功',
            icon: 'success'
          })
        }
      }
    })
  }

  // 保存结果
  const saveResult = () => {
    const favorites = wx.getStorageSync('testFavorites') || []
    favorites.unshift({
      ...resultColor,
      testDate: new Date().toISOString()
    })
    wx.setStorageSync('testFavorites', favorites)
    
    showToast({
      title: '已保存到我的收藏',
      icon: 'success'
    })
  }

  // 查看历史记录
  const viewHistory = () => {
    navigateTo({
      url: '/pages/color-test-history/index'
    })
  }

  return (
    <View className="color-test-page">
      {/* 顶部标题 */}
      <View className="test-header">
        <Text className="test-title">性格颜色测试</Text>
        <Text className="test-subtitle">发现你的专属颜色</Text>
        <View className="progress-bar">
          <View 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></View>
        </View>
        <Text className="progress-text">
          第 {currentQuestion + 1} 题 / 共 {questions.length} 题
        </Text>
      </View>

      {/* 测试内容区域 */}
      <ScrollView className="test-content" scrollY>
        {!testComplete ? (
          <>
            {/* 问题展示 */}
            <View className="question-card">
              <View className="question-number">
                <Text className="number-text">Q{currentQuestion + 1}</Text>
              </View>
              <Text className="question-text">
                {questions[currentQuestion].question}
              </Text>
            </View>

            {/* 选项列表 */}
            <View className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
                <View 
                  key={index}
                  className="option-card"
                  onClick={() => selectAnswer(option)}
                >
                  <View 
                    className="option-color"
                    style={{ backgroundColor: option.color }}
                  ></View>
                  <View className="option-content">
                    <Text className="option-text">{option.text}</Text>
                  </View>
                  <View className="option-arrow">›</View>
                </View>
              ))}
            </View>

            {/* 提示信息 */}
            <View className="test-tips">
              <Text className="tips-icon">💡</Text>
              <Text className="tips-text">
                请根据第一直觉选择，不要过多思考
              </Text>
            </View>
          </>
        ) : !showResult ? (
          // 完成测试，等待查看结果
          <View className="completion-view">
            <View className="celebration">
              <Text className="celebration-emoji">🎉</Text>
              <Text className="celebration-text">测试完成！</Text>
            </View>
            <View className="result-preview">
              <View 
                className="result-color-preview"
                style={{ backgroundColor: resultColor.hex }}
              >
                <Text className="result-emoji">{resultColor.emoji}</Text>
              </View>
              <Text className="result-preview-name">{resultColor.name}</Text>
              <Text className="result-preview-meaning">{resultColor.meaning}</Text>
            </View>
            <Button 
              className="btn-view-result"
              onClick={showResultDetails}
            >
              查看完整结果 →
            </Button>
          </View>
        ) : (
          // 显示完整结果
          <View className="result-view">
            {/* 结果头部 */}
            <View className="result-header">
              <View 
                className="result-main-color"
                style={{ backgroundColor: resultColor.hex }}
              >
                <Text className="main-emoji">{resultColor.emoji}</Text>
                <Text className="main-name">{resultColor.name}</Text>
                <Text className="main-meaning">{resultColor.meaning}</Text>
              </View>
            </View>

            {/* 结果描述 */}
            <View className="result-description">
              <Text className="description-title">颜色解析</Text>
              <Text className="description-text">{resultColor.description}</Text>
            </View>

            {/* 性格特征 */}
            <View className="personality-traits">
              <Text className="traits-title">性格特征</Text>
              <View className="traits-grid">
                {resultColor.personality.split('、').map((trait, index) => (
                  <View key={index} className="trait-chip">
                    <Text className="trait-text">{trait}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 生活建议 */}
            <View className="life-advice">
              <Text className="advice-title">💡 生活建议</Text>
              <Text className="advice-text">{resultColor.tips}</Text>
            </View>

            {/* 颜色搭配 */}
            <View className="color-matching">
              <Text className="matching-title">🎨 搭配建议</Text>
              <ScrollView className="matching-colors" scrollX>
                {['#FFFFFF', '#000000', '#FFD700', '#A8E6CF', '#FFAAA5'].map((color, index) => (
                  <View 
                    key={index}
                    className="matching-color"
                    style={{ backgroundColor: color }}
                  ></View>
                ))}
              </ScrollView>
              <Text className="matching-tip">
                与中性色搭配更显高级感
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 底部操作按钮 */}
      {testComplete && showResult && (
        <View className="result-actions">
          <Button className="action-btn save" onClick={saveResult}>
            💾 收藏结果
          </Button>
          <Button className="action-btn share" onClick={shareResult}>
            ↪️ 分享结果
          </Button>
          <Button className="action-btn restart" onClick={restartTest}>
            🔄 再测一次
          </Button>
        </View>
      )}

      {/* 历史记录入口 */}
      {!testComplete && (
        <View className="history-entry" onClick={viewHistory}>
          <Text className="history-icon">📚</Text>
          <Text className="history-text">查看历史记录</Text>
        </View>
      )}
    </View>
  )
}