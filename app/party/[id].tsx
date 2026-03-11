import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ChevronLeft,
  Send,
  Users,
  Play,
  Pause,
  Volume2,
  MessageCircle,
  Smile,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { trendingMovies, popularShows } from '@/data/dummyData';

const { width, height } = Dimensions.get('window');

const dummyMessages = [
  {
    id: '1',
    user: 'John Doe',
    avatar:
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'This scene is amazing!',
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: '2',
    user: 'Jane Smith',
    avatar:
      'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'Right? The cinematography is incredible',
    timestamp: new Date(Date.now() - 3 * 60000),
  },
  {
    id: '3',
    user: 'You',
    avatar:
      'https://images.pexels.com/photos/1558618/pexels-photo-1558618.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: 'Can\'t wait for the next episode!',
    timestamp: new Date(Date.now() - 1 * 60000),
  },
];

export default function WatchPartyScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const [messageText, setMessageText] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showChat, setShowChat] = useState(true);

  const allMedia = [...trendingMovies, ...popularShows];
  const media = allMedia[0];

  const participants = [
    {
      id: '1',
      name: 'You',
      avatar:
        'https://images.pexels.com/photos/1558618/pexels-photo-1558618.jpeg?auto=compress&cs=tinysrgb&w=100',
      isHost: true,
    },
    {
      id: '2',
      name: 'John Doe',
      avatar:
        'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=100',
      isHost: false,
    },
    {
      id: '3',
      name: 'Jane Smith',
      avatar:
        'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
      isHost: false,
    },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Watch Party
          </Text>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      <View style={styles.mainContent}>
        {/* Video Player Area */}
        <View style={[styles.playerContainer, { backgroundColor: colors.card }]}>
          <Image
            source={{ uri: media.backdrop || media.poster }}
            style={styles.playerVideo}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', colors.background + 'CC']}
            style={styles.playerGradient}
          />

          <View style={styles.playerControls}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={24} color="#FFFFFF" fill="#FFFFFF" />
              ) : (
                <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
              )}
            </TouchableOpacity>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: colors.primary, width: '35%' },
                ]}
              />
            </View>
            <TouchableOpacity>
              <Volume2 size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.participantsOverlay}>
            <View style={styles.participantsList}>
              {participants.map((participant) => (
                <View key={participant.id} style={styles.participantItem}>
                  <Image
                    source={{ uri: participant.avatar }}
                    style={styles.participantAvatar}
                  />
                  {participant.isHost && (
                    <View style={[styles.hostBadge, { backgroundColor: colors.primary }]}>
                      <Text style={styles.hostText}>HOST</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Media Info and Chat */}
        <View style={styles.bottomSection}>
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={[styles.mediaInfo, { backgroundColor: colors.card }]}
          >
            <Image
              source={{ uri: media.poster }}
              style={styles.mediaPoster}
            />
            <View style={styles.mediaDetails}>
              <Text style={[styles.mediaTitle, { color: colors.text }]}>
                {media.title}
              </Text>
              <View style={styles.participantCount}>
                <Users size={14} color={colors.textSecondary} />
                <Text
                  style={[styles.participantText, { color: colors.textSecondary }]}
                >
                  {participants.length} watching
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.chatToggle}
              onPress={() => setShowChat(!showChat)}
            >
              <MessageCircle size={20} color={colors.text} />
            </TouchableOpacity>
          </Animated.View>

          {/* Chat Section */}
          {showChat && (
            <Animated.View
              entering={FadeInDown.delay(100).duration(600)}
              style={[styles.chatContainer, { backgroundColor: colors.card }]}
            >
              <View style={styles.chatHeader}>
                <Text style={[styles.chatTitle, { color: colors.text }]}>
                  Party Chat
                </Text>
              </View>

              <FlatList
                data={dummyMessages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.message}>
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.messageAvatar}
                    />
                    <View style={styles.messageContent}>
                      <Text style={[styles.messageName, { color: colors.text }]}>
                        {item.user}
                      </Text>
                      <Text
                        style={[styles.messageText, { color: colors.textSecondary }]}
                      >
                        {item.text}
                      </Text>
                    </View>
                  </View>
                )}
                style={styles.messagesList}
                contentContainerStyle={styles.messagesListContent}
                scrollEnabled={true}
              />

              <View
                style={[
                  styles.inputContainer,
                  { borderTopColor: colors.border },
                ]}
              >
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.surface,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="Send a message..."
                  placeholderTextColor={colors.textSecondary}
                  value={messageText}
                  onChangeText={setMessageText}
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSendMessage}
                >
                  {messageText.trim() ? (
                    <Send size={20} color={colors.primary} />
                  ) : (
                    <Smile size={20} color={colors.textSecondary} />
                  )}
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </View>
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
  },
  playerContainer: {
    flex: 0.5,
    position: 'relative',
    borderRadius: 12,
    margin: 12,
    overflow: 'hidden',
  },
  playerVideo: {
    width: '100%',
    height: '100%',
  },
  playerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  playerControls: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  participantsOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  participantsList: {
    flexDirection: 'row',
    gap: -8,
  },
  participantItem: {
    position: 'relative',
  },
  participantAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  hostBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hostText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  bottomSection: {
    flex: 0.5,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  mediaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  mediaPoster: {
    width: 60,
    height: 90,
    borderRadius: 8,
  },
  mediaDetails: {
    flex: 1,
  },
  mediaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  participantCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  participantText: {
    fontSize: 12,
  },
  chatToggle: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    borderRadius: 12,
    marginTop: 12,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  chatHeader: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
  },
  messagesListContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  message: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageContent: {
    flex: 1,
  },
  messageName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
  },
  sendButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
