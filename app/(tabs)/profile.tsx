import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Moon,
  Sun,
  LogOut,
  Settings,
  Heart,
  Clock,
  Users,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { colors, isDark, theme, setTheme } = useTheme();
  const { profile, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel' },
      {
        text: 'Sign Out',
        onPress: async () => {
          await signOut();
          router.replace('/auth/login');
        },
      },
    ]);
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(isDark ? 'light' : 'dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Profile
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          entering={FadeInDown.duration(600)}
          style={[styles.profileCard, { backgroundColor: colors.card }]}
        >
          <LinearGradient
            colors={[colors.gradient1, colors.gradient2]}
            style={styles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: profile?.avatar_url ||
                    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
                }}
                style={styles.profileImage}
              />
              <View
                style={[
                  styles.onlineIndicator,
                  { backgroundColor: colors.success },
                ]}
              />
            </View>
          </LinearGradient>

          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {profile?.username || 'User'}
            </Text>
            <Text
              style={[styles.profileBio, { color: colors.textSecondary }]}
            >
              {profile?.bio || 'Passionate about movies and shows'}
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Heart size={16} color={colors.primary} />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  24
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Favorites
                </Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={16} color={colors.accent} />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  156h
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Watched
                </Text>
              </View>
              <View style={styles.statItem}>
                <Users size={16} color={colors.primary} />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  12
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Friends
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Settings
            </Text>

            <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  {isDark ? (
                    <Moon size={20} color={colors.primary} />
                  ) : (
                    <Sun size={20} color={colors.accent} />
                  )}
                  <View style={styles.settingText}>
                    <Text style={[styles.settingTitle, { color: colors.text }]}>
                      {theme === 'system'
                        ? 'System'
                        : isDark
                          ? 'Dark Mode'
                          : 'Light Mode'}
                    </Text>
                    <Text
                      style={[
                        styles.settingDescription,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Choose your preferred theme
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={toggleTheme}
                  style={[
                    styles.modeToggle,
                    { backgroundColor: colors.surface },
                  ]}
                >
                  {isDark ? (
                    <Moon size={16} color={colors.text} />
                  ) : (
                    <Sun size={16} color={colors.text} />
                  )}
                </TouchableOpacity>
              </View>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
                <View style={styles.settingLeft}>
                  <Settings size={20} color={colors.text} />
                  <View style={styles.settingText}>
                    <Text style={[styles.settingTitle, { color: colors.text }]}>
                      Account Settings
                    </Text>
                    <Text
                      style={[
                        styles.settingDescription,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Manage your profile
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: colors.border }]} />

              <TouchableOpacity
                style={styles.settingItem}
                onPress={handleLogout}
              >
                <View style={styles.settingLeft}>
                  <LogOut size={20} color={colors.error} />
                  <View style={styles.settingText}>
                    <Text
                      style={[styles.settingTitle, { color: colors.error }]}
                    >
                      Sign Out
                    </Text>
                    <Text
                      style={[
                        styles.settingDescription,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Logout from your account
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

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
  scrollContent: {
    paddingHorizontal: 20,
  },
  profileCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  profileGradient: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    padding: 20,
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  statItem: {
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  modeToggle: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
