import { View, Text } from '@tarojs/components'
import './index.css'

export default function ColorCard({ color }) {
  if (!color) return null

  return (
    <View className="color-card">
      <View className="card-header">
        <Text className="card-title">颜色信息</Text>
        <View 
          className="color-dot" 
          style={{ backgroundColor: color.hex }}
        />
      </View>
      
      <View className="card-content">
        <View className="info-item">
          <Text className="info-label">含义：</Text>
          <Text className="info-value">{color.meaning}</Text>
        </View>
        
        <View className="info-item">
          <Text className="info-label">心情：</Text>
          <Text className="info-value">{color.mood}</Text>
        </View>
        
        <View className="info-item">
          <Text className="info-label">建议：</Text>
          <Text className="info-value">{color.tips}</Text>
        </View>
        
        <View className="color-codes">
          <View className="code-item">
            <Text className="code-label">HEX</Text>
            <Text className="code-value">{color.hex}</Text>
          </View>
          <View className="code-item">
            <Text className="code-label">RGB</Text>
            <Text className="code-value">{color.rgb}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}