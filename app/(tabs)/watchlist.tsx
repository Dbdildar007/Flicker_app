import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Play, X, Star } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { myWatchlist } from '@/data/dummyData';

export default function WatchlistScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const handleMediaPress = (mediaId: string) => {
    router.push({
      pathname: '/media/[id]',
      params: { id: mediaId },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            My Watchlist
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {myWatchlist.length} {myWatchlist.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {myWatchlist.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Your watchlist is empty
            </Text>
            <Text
              style={[styles.emptySubtext, { color: colors.textSecondary }]}
            >
              Add movies and shows you want to watch
            </Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {myWatchlist.map((media, index) => (
              <Animated.View
                key={media.id}
                entering={FadeInDown.delay(index * 100).duration(600)}
              >
                <TouchableOpacity
                  style={[styles.card, { backgroundColor: colors.card }]}
                  onPress={() => handleMediaPress(media.id)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: media.poster }}
                    style={styles.poster}
                    resizeMode="cover"
                  />
                  <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Text
                        style={[styles.title, { color: colors.text }]}
                        numberOfLines={2}
                      >
                        {media.title}
                      </Text>
                      {media.rating && (
                        <View style={styles.ratingContainer}>
                          <Star size={14} color="#FFD700" fill="#FFD700" />
                          <Text style={[styles.rating, { color: colors.text }]}>
                            {media.rating.toFixed(1)}
                          </Text>
                        </View>
                      )}
                    </View>

                    {media.genres && media.genres.length > 0 && (
                      <View style={styles.genreContainer}>
                        {media.genres.slice(0, 2).map((genre, idx) => (
                          <View
                            key={idx}
                            style={[
                              styles.genreBadge,
                              { backgroundColor: colors.surface },
                            ]}
                          >
                            <Text
                              style={[
                                styles.genreText,
                                { color: colors.textSecondary },
                              ]}
                            >
                              {genre}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    <Text
                      style={[styles.overview, { color: colors.textSecondary }]}
                      numberOfLines={3}
                    >
                      {media.overview}
                    </Text>

                    <View style={styles.actions}>
                      <TouchableOpacity
                        style={[
                          styles.playButton,
                          { backgroundColor: colors.primary },
                        ]}
                        onPress={() => handleMediaPress(media.id)}
                      >
                        <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                        <Text style={styles.playButtonText}>Play</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.removeButton,
                          {
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                          },
                        ]}
                      >
                        <X size={16} color={colors.textSecondary} />
                        <Text
                          style={[
                            styles.removeButtonText,
                            { color: colors.textSecondary },
                          ]}
                        >
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
  listContainer: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  genreContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  genreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  genreText: {
    fontSize: 11,
    fontWeight: '600',
  },
  overview: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
    flex: 1,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    flex: 1,
  },
  removeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
