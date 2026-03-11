import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, Play } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { Media } from '@/types/database';

interface MediaCardProps {
  media: Media;
  onPress: () => void;
  width?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function MediaCard({ media, onPress, width = 140 }: MediaCardProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle, { width }]}
    >
      <View style={[styles.imageContainer, { width, height: width * 1.5 }]}>
        <Image
          source={{ uri: media.poster }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          {media.rating && (
            <View style={styles.ratingContainer}>
              <Star size={12} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{media.rating.toFixed(1)}</Text>
            </View>
          )}
        </LinearGradient>
        <View style={styles.playIconContainer}>
          <View
            style={[
              styles.playIcon,
              { backgroundColor: colors.primary + '20' },
            ]}
          >
            <Play size={20} color={colors.primary} fill={colors.primary} />
          </View>
        </View>
      </View>
      <Text
        style={[styles.title, { color: colors.text }]}
        numberOfLines={2}
      >
        {media.title}
      </Text>
      {media.genres && media.genres.length > 0 && (
        <Text
          style={[styles.genre, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {media.genres[0]}
        </Text>
      )}
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'flex-end',
    padding: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  playIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  genre: {
    fontSize: 12,
    marginTop: 2,
  },
});
