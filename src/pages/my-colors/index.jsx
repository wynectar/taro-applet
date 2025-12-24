import { useState, useEffect } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { navigateTo } from '@tarojs/taro'
import './index.css'

export default function MyColors() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const historyData = wx.getStorageSync('colorHistory') || []
    setHistory(historyData)
  }, [])

  return (
    <View className="my-colors-page">
      <View className="page-header">
        <Text className="page-title">我的幸运色记录</Text>
        <Text className="page-subtitle">共 {history.length} 条记录</Text>
      </View>

      <ScrollView className="history-list" scrollY>
        {history.length === 0 ? (
          <View className="empty-state">
            <Text className="empty-icon">🎨</Text>
            <Text className="empty-text">暂无记录，快去生成你的幸运色吧！</Text>
          </View>
        ) : (
          history.map((item, index) => {
            const date = new Date(item.date).toLocaleDateString('zh-CN')
            return (
              <View 
                key={index}
                className="history-item"
                onClick={() => navigateTo({
                  url: `/pages/color-detail/index?color=${encodeURIComponent(JSON.stringify(item.color))}`
                })}
              >
                <View 
                  className="item-color" 
                  style={{ backgroundColor: item.color.hex }}
                >
                  <Text className="color-emoji">{item.color.emoji}</Text>
                </View>
                <View className="item-info">
                  <Text className="item-name">{item.color.name}</Text>
                  <Text className="item-date">{date}</Text>
                  <Text className="item-meaning">{item.color.meaning}</Text>
                </View>
                <Text className="item-arrow">›</Text>
              </View>
            )
          })
        )}
      </ScrollView>
    </View>
  )
}