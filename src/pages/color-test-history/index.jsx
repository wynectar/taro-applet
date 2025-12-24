import { useState, useEffect } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { navigateBack, showModal } from '@tarojs/taro'
import './index.css'

export default function TestHistory() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    const testHistory = wx.getStorageSync('testHistory') || []
    setHistory(testHistory)
  }

  const clearHistory = () => {
    showModal({
      title: '确认清空',
      content: '确定要清空所有测试记录吗？',
      showCancel: true,
      confirmText: '清空',
      confirmColor: '#FF6B6B',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('testHistory', [])
          setHistory([])
        }
      }
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <View className="test-history-page">
      <View className="history-header">
        {/* <View className="back-btn" onClick={navigateBack}>
          <Text className="back-icon">‹</Text>
        </View> */}
        <Text className="history-title">测试历史记录</Text>
        {history.length > 0 && (
          <View className="clear-btn" onClick={clearHistory}>
            <Text className="clear-text">清空</Text>
          </View>
        )}
      </View>

      <ScrollView className="history-list" scrollY>
        {history.length === 0 ? (
          <View className="empty-state">
            <Text className="empty-icon">📚</Text>
            <Text className="empty-text">暂无测试记录</Text>
            <Text className="empty-subtext">快去完成你的第一次测试吧！</Text>
          </View>
        ) : (
          history.map((record, index) => (
            <View key={index} className="history-card">
              <View className="card-header">
                <View 
                  className="color-badge"
                  style={{ backgroundColor: record.result.hex }}
                >
                  <Text className="color-emoji">{record.result.emoji}</Text>
                </View>
                <View className="card-info">
                  <Text className="result-name">{record.result.name}</Text>
                  <Text className="result-meaning">{record.result.meaning}</Text>
                  <Text className="test-date">{formatDate(record.date)}</Text>
                </View>
                <Text className="card-index">#{index + 1}</Text>
              </View>
              <View className="card-divider"></View>
              <Text className="card-description">
                {record.result.description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}