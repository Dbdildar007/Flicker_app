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
import { Play, Plus, Star } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Media } from '@/types/database';

const { width } = Dimensions.get('window');

interface HeroBannerProps {
  media: Media;
  onPlay: () => void;
  onAddToWatchlist: () => void;
}

export default function HeroBanner({
  media,
  onPlay,
  onAddToWatchlist,
}: HeroBannerProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: media.backdrop || media.poster }}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', colors.background]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {media.title}
          </Text>

          {media.genres && media.genres.length > 0 && (
            <View style={styles.genreContainer}>
              {media.genres.slice(0, 3).map((genre, index) => (
                <View
                  key={index}
                  style={[
                    styles.genreBadge,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <Text
                    style={[styles.genreText, { color: colors.textSecondary }]}
                  >
                    {genre}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {media.rating && (
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={[styles.rating, { color: colors.text }]}>
                {media.rating.toFixed(1)}
              </Text>
            </View>
          )}

          <Text
            style={[styles.overview, { color: colors.textSecondary }]}
            numberOfLines={3}
          >
            {media.overview}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPlay} style={styles.playButtonContainer}>
              <LinearGradient
                colors={[colors.gradient1, colors.gradient2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.playButton}
              >
                <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.playButtonText}>Play Now</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onAddToWatchlist}
              style={[
                styles.addButton,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Plus size={20} color={colors.text} />
              <Text style={[styles.addButtonText, { color: colors.text }]}>
                Watchlist
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: 500,
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
    height: 400,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  genreContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  genreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  genreText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  overview: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  playButtonContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
