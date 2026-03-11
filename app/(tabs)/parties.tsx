import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Plus, Users, Play, Clock, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { trendingMovies } from '@/data/dummyData';

const dummyParties = [
  {
    id: 'party-1',
    hostName: 'John Doe',
    media: trendingMovies[0],
    participants: 4,
    status: 'waiting',
    created_at: new Date().toISOString(),
  },
  {
    id: 'party-2',
    hostName: 'Jane Smith',
    media: trendingMovies[1],
    participants: 2,
    status: 'playing',
    created_at: new Date().toISOString(),
  },
];

export default function WatchPartiesScreen() {
  const { colors } = useTheme();
  const { profile } = useAuth();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [partyCode, setPartyCode] = useState('');

  const handleCreateParty = () => {
    setShowCreateModal(false);
    Alert.alert('Success', 'Watch party created! Invite your friends to join.');
  };

  const handleJoinParty = (partyId: string) => {
    router.push({
      pathname: '/party/[id]',
      params: { id: partyId },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Watch Parties
            </Text>
            <Text
              style={[styles.headerSubtitle, { color: colors.textSecondary }]}
            >
              Watch together with friends
            </Text>
          </View>
          <TouchableOpacity
            style={styles.createButtonContainer}
            onPress={() => setShowCreateModal(true)}
          >
            <LinearGradient
              colors={[colors.gradient1, colors.gradient2]}
              style={styles.createButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Plus size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Active Parties
          </Text>

          {dummyParties.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Users size={64} color={colors.textSecondary} />
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No active watch parties
              </Text>
              <Text
                style={[styles.emptySubtext, { color: colors.textSecondary }]}
              >
                Create a party and invite friends to watch together
              </Text>
            </View>
          ) : (
            <View style={styles.partiesList}>
              {dummyParties.map((party, index) => (
                <Animated.View
                  key={party.id}
                  entering={FadeInDown.delay(index * 100).duration(600)}
                >
                  <TouchableOpacity
                    style={[styles.partyCard, { backgroundColor: colors.card }]}
                    onPress={() => handleJoinParty(party.id)}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={{ uri: party.media.poster }}
                      style={styles.partyPoster}
                      resizeMode="cover"
                    />
                    <View style={styles.partyContent}>
                      <Text
                        style={[styles.partyTitle, { color: colors.text }]}
                        numberOfLines={1}
                      >
                        {party.media.title}
                      </Text>
                      <Text
                        style={[
                          styles.partyHost,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Hosted by {party.hostName}
                      </Text>

                      <View style={styles.partyStats}>
                        <View style={styles.statItem}>
                          <Users size={14} color={colors.textSecondary} />
                          <Text
                            style={[
                              styles.statText,
                              { color: colors.textSecondary },
                            ]}
                          >
                            {party.participants}
                          </Text>
                        </View>

                        <View
                          style={[
                            styles.statusBadge,
                            {
                              backgroundColor:
                                party.status === 'playing'
                                  ? colors.success + '20'
                                  : colors.accent + '20',
                            },
                          ]}
                        >
                          {party.status === 'playing' ? (
                            <Play
                              size={12}
                              color={colors.success}
                              fill={colors.success}
                            />
                          ) : (
                            <Clock size={12} color={colors.accent} />
                          )}
                          <Text
                            style={[
                              styles.statusText,
                              {
                                color:
                                  party.status === 'playing'
                                    ? colors.success
                                    : colors.accent,
                              },
                            ]}
                          >
                            {party.status === 'playing' ? 'Playing' : 'Waiting'}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={[
                          styles.joinButton,
                          { backgroundColor: colors.primary },
                        ]}
                        onPress={() => handleJoinParty(party.id)}
                      >
                        <Text style={styles.joinButtonText}>Join Party</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Modal
        visible={showCreateModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <Animated.View
            entering={FadeIn.duration(200)}
            style={[styles.modalContent, { backgroundColor: colors.card }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Create Watch Party
              </Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text
              style={[styles.modalDescription, { color: colors.textSecondary }]}
            >
              Select a movie or show from your watchlist to create a watch party
            </Text>

            <View style={styles.quickMediaList}>
              {trendingMovies.slice(0, 3).map((media) => (
                <TouchableOpacity
                  key={media.id}
                  style={[
                    styles.quickMediaItem,
                    { backgroundColor: colors.surface },
                  ]}
                  onPress={handleCreateParty}
                >
                  <Image
                    source={{ uri: media.poster }}
                    style={styles.quickMediaPoster}
                  />
                  <Text
                    style={[styles.quickMediaTitle, { color: colors.text }]}
                    numberOfLines={2}
                  >
                    {media.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalDivider}>
              <View
                style={[styles.dividerLine, { backgroundColor: colors.border }]}
              />
              <Text
                style={[styles.dividerText, { color: colors.textSecondary }]}
              >
                OR
              </Text>
              <View
                style={[styles.dividerLine, { backgroundColor: colors.border }]}
              />
            </View>

            <Text style={[styles.inputLabel, { color: colors.text }]}>
              Join with party code
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Enter party code"
              placeholderTextColor={colors.textSecondary}
              value={partyCode}
              onChangeText={setPartyCode}
              autoCapitalize="characters"
            />

            <TouchableOpacity
              style={styles.modalButtonContainer}
              onPress={() => {
                setShowCreateModal(false);
                Alert.alert('Joined', 'Successfully joined the watch party!');
              }}
            >
              <LinearGradient
                colors={[colors.gradient1, colors.gradient2]}
                style={styles.modalButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.modalButtonText}>Join Party</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  createButtonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  createButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  partiesList: {
    gap: 16,
  },
  partyCard: {
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
  },
  partyPoster: {
    width: 80,
    height: 120,
    borderRadius: 12,
  },
  partyContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  partyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  partyHost: {
    fontSize: 14,
    marginTop: 4,
  },
  partyStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  joinButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  quickMediaList: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  quickMediaItem: {
    flex: 1,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
  },
  quickMediaPoster: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },
  quickMediaTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  modalButtonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalButton: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
