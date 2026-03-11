import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Play,
  Plus,
  Star,
  Share2,
  ChevronLeft,
  Clock,
  Calendar,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { trendingMovies, popularShows } from '@/data/dummyData';

const { width } = Dimensions.get('window');

export default function MediaDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const allMedia = [...trendingMovies, ...popularShows];
  const media = allMedia.find((m) => m.id === id);

  if (!media) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Content not found
        </Text>
      </View>
    );
  }

  const handlePlayPress = () => {
    Alert.alert('Playing', `Now playing: ${media.title}`);
  };

  const handleAddToWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    Alert.alert(
      'Success',
      isInWatchlist
        ? 'Removed from watchlist'
        : 'Added to your watchlist!'
    );
  };

  const handleShare = () => {
    Alert.alert('Share', `Share ${media.title} with friends`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.topBarTitle, { color: colors.text }]}>
            Details
          </Text>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn.duration(600)}>
          <Image
            source={{ uri: media.backdrop || media.poster }}
            style={styles.backdrop}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', colors.background]}
            style={styles.backdropGradient}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.content}
        >
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: colors.text }]}>
              {media.title}
            </Text>
            {media.rating && (
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={[styles.rating, { color: colors.text }]}>
                  {media.rating.toFixed(1)}
                </Text>
                <Text
                  style={[styles.ratingCount, { color: colors.textSecondary }]}
                >
                  (2.4K reviews)
                </Text>
              </View>
            )}
          </View>

          {media.release_date && (
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Calendar size={16} color={colors.textSecondary} />
                <Text
                  style={[styles.metaText, { color: colors.textSecondary }]}
                >
                  {new Date(media.release_date).getFullYear()}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Clock size={16} color={colors.textSecondary} />
                <Text
                  style={[styles.metaText, { color: colors.textSecondary }]}
                >
                  {media.type === 'movie' ? '2h 28m' : '45m per episode'}
                </Text>
              </View>
            </View>
          )}

          {media.genres && media.genres.length > 0 && (
            <View style={styles.genreContainer}>
              {media.genres.map((genre, index) => (
                <View
                  key={index}
                  style={[
                    styles.genreBadge,
                    { backgroundColor: colors.primary + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.genreText,
                      { color: colors.primary },
                    ]}
                  >
                    {genre}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.playButtonContainer}
              onPress={handlePlayPress}
            >
              <LinearGradient
                colors={[colors.gradient1, colors.gradient2]}
                style={styles.playButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
                <Text style={styles.playButtonText}>Play Now</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.iconButton,
                {
                  backgroundColor: isInWatchlist
                    ? colors.primary + '20'
                    : colors.surface,
                },
              ]}
              onPress={handleAddToWatchlist}
            >
              <Plus
                size={20}
                color={isInWatchlist ? colors.primary : colors.text}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: colors.surface }]}
              onPress={handleShare}
            >
              <Share2 size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Overview
            </Text>
            <Text
              style={[styles.overview, { color: colors.textSecondary }]}
            >
              {media.overview ||
                'This is an amazing piece of content that you will definitely enjoy. Watch it now with your friends!'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Cast & Crew
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.castList}
            >
              {['Actor 1', 'Actor 2', 'Actor 3'].map((actor, index) => (
                <View
                  key={index}
                  style={[
                    styles.castItem,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  <Image
                    source={{
                      uri: `https://images.pexels.com/photos/${1000 + index}/pexels-photo-${1000 + index}.jpeg?auto=compress&cs=tinysrgb&w=100`,
                    }}
                    style={styles.castImage}
                  />
                  <Text
                    style={[styles.castName, { color: colors.text }]}
                  >
                    {actor}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={{ height: 40 }} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backdrop: {
    width,
    height: 300,
  },
  backdropGradient: {
    height: 100,
  },
  content: {
    marginTop: -50,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingCount: {
    fontSize: 14,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
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
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  playButtonContainer: {
    flex: 1,
    borderRadius: 12,
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
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  overview: {
    fontSize: 14,
    lineHeight: 22,
  },
  castList: {
    gap: 12,
  },
  castItem: {
    width: 100,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  castImage: {
    width: 100,
    height: 100,
  },
  castName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
