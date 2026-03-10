import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp(const FlickerApp());
}

class FlickerApp extends StatelessWidget {
  const FlickerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flicker',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0A0C14),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFFF3D71),
          secondary: Color(0xFF00D9FF),
          surface: Color(0xFF151A2D),
        ),
        useMaterial3: true,
      ),
      home: const FlickerShell(),
    );
  }
}

class FlickerShell extends StatefulWidget {
  const FlickerShell({super.key});

  @override
  State<FlickerShell> createState() => _FlickerShellState();
}

class _FlickerShellState extends State<FlickerShell> {
  int _currentIndex = 0;

  final _pages = const [
    HomeScreen(),
    SearchScreen(),
    FriendsScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(child: _pages[_currentIndex]),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) => setState(() => _currentIndex = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_filled), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.search), label: 'Search'),
          NavigationDestination(icon: Icon(Icons.people_alt_rounded), label: 'Friends'),
          NavigationDestination(icon: Icon(Icons.person_rounded), label: 'Profile'),
        ],
      ),
    );
  }
}

class FlickerHeader extends StatelessWidget {
  const FlickerHeader({super.key, required this.subtitle});

  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 42,
          height: 42,
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFFFF3D71), Color(0xFF00D9FF)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          alignment: Alignment.center,
          child: const Text(
            'F',
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
          ),
        ),
        const SizedBox(width: 12),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Flicker',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800),
            ),
            Text(subtitle,
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.white.withOpacity(0.65),
                )),
          ],
        ),
      ],
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final Set<String> _myList = {};

  final List<Map<String, String>> _trending = const [
    {'title': 'Neon Rift', 'category': 'Sci-Fi Thriller'},
    {'title': 'Royal Chase', 'category': 'Action Drama'},
    {'title': 'Mumbai Detectives', 'category': 'Crime Series'},
    {'title': 'Dark Protocol', 'category': 'Spy Universe'},
  ];

  final List<Map<String, String>> _continueWatching = const [
    {'title': 'The Last Kingdom', 'progress': 'S2 • E7 · 38m left'},
    {'title': 'Racer X', 'progress': 'S1 • E4 · 14m left'},
    {'title': 'Pixel Hearts', 'progress': 'Film · 1h 06m left'},
  ];

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    final isCompact = size.width < 390;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const FlickerHeader(subtitle: 'Your premium entertainment hub'),
          const SizedBox(height: 20),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(22),
              gradient: const LinearGradient(
                colors: [Color(0xFF25174F), Color(0xFF6E215B)],
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Featured Premiere',
                    style: TextStyle(color: Colors.white.withOpacity(.7))),
                const SizedBox(height: 8),
                Text(
                  'ECLIPSE: ORIGIN',
                  style: TextStyle(
                    fontSize: isCompact ? 24 : 28,
                    fontWeight: FontWeight.w900,
                    height: 0.95,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'A cinematic blend of Netflix-style storytelling and Hotstar-like live intensity.',
                  style: TextStyle(color: Colors.white.withOpacity(0.82)),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    FilledButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.play_arrow_rounded),
                      label: const Text('Watch Now'),
                    ),
                    const SizedBox(width: 8),
                    OutlinedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.info_outline_rounded),
                      label: const Text('Details'),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          _SectionTitle(
            title: 'Trending Today',
            actionLabel: 'See all',
            onTap: () {},
          ),
          const SizedBox(height: 12),
          SizedBox(
            height: 175,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemBuilder: (_, i) {
                final item = _trending[i];
                final inList = _myList.contains(item['title']);
                return _MediaCard(
                  title: item['title']!,
                  subtitle: item['category']!,
                  width: isCompact ? 150 : 170,
                  onToggleList: () {
                    setState(() {
                      if (inList) {
                        _myList.remove(item['title']);
                      } else {
                        _myList.add(item['title']!);
                      }
                    });
                  },
                  inList: inList,
                );
              },
              separatorBuilder: (_, __) => const SizedBox(width: 12),
              itemCount: _trending.length,
            ),
          ),
          const SizedBox(height: 20),
          _SectionTitle(
            title: 'Continue Watching',
            actionLabel: 'History',
            onTap: () {},
          ),
          const SizedBox(height: 12),
          ..._continueWatching.map((item) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: _ContinueWatchingTile(
                  title: item['title']!,
                  progressLabel: item['progress']!,
                ),
              )),
        ],
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle({
    required this.title,
    required this.actionLabel,
    required this.onTap,
  });

  final String title;
  final String actionLabel;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
        TextButton(onPressed: onTap, child: Text(actionLabel)),
      ],
    );
  }
}

class _MediaCard extends StatelessWidget {
  const _MediaCard({
    required this.title,
    required this.subtitle,
    required this.width,
    required this.onToggleList,
    required this.inList,
  });

  final String title;
  final String subtitle;
  final double width;
  final VoidCallback onToggleList;
  final bool inList;

  @override
  Widget build(BuildContext context) {
    final randomShade = 0xFF1E2A50 + Random(title.hashCode).nextInt(0x00222222);

    return Container(
      width: width,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(18),
        color: Color(randomShade),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Spacer(),
          Text(title,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style:
                  const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
          const SizedBox(height: 4),
          Text(subtitle,
              style: TextStyle(color: Colors.white.withOpacity(0.7), fontSize: 12)),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonalIcon(
              onPressed: onToggleList,
              icon: Icon(inList ? Icons.check : Icons.add),
              label: Text(inList ? 'In My List' : 'My List'),
            ),
          ),
        ],
      ),
    );
  }
}

class _ContinueWatchingTile extends StatelessWidget {
  const _ContinueWatchingTile({
    required this.title,
    required this.progressLabel,
  });

  final String title;
  final String progressLabel;

  @override
  Widget build(BuildContext context) {
    final pct = (title.hashCode.abs() % 60 + 35) / 100;

    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF151A2D),
        borderRadius: BorderRadius.circular(14),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
          const SizedBox(height: 4),
          Text(progressLabel,
              style: TextStyle(fontSize: 12, color: Colors.white.withOpacity(0.72))),
          const SizedBox(height: 8),
          LinearProgressIndicator(value: pct, borderRadius: BorderRadius.circular(40)),
        ],
      ),
    );
  }
}

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final _controller = TextEditingController();

  final List<String> _catalog = const [
    'Midnight Origins',
    'Urban Strike',
    'Skyline 2049',
    'Inside Champions League',
    'Frontline Coders',
    'Echoes of Empire',
    'Weekend Premieres',
  ];

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final query = _controller.text.toLowerCase().trim();
    final filtered = query.isEmpty
        ? _catalog
        : _catalog.where((item) => item.toLowerCase().contains(query)).toList();

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const FlickerHeader(subtitle: 'Search movies, shows, and live events'),
          const SizedBox(height: 16),
          TextField(
            controller: _controller,
            onChanged: (_) => setState(() {}),
            decoration: InputDecoration(
              hintText: 'Search titles, actors, sports',
              prefixIcon: const Icon(Icons.search),
              filled: true,
              fillColor: const Color(0xFF151A2D),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: BorderSide.none,
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text('Results (${filtered.length})',
              style: const TextStyle(fontWeight: FontWeight.w700)),
          const SizedBox(height: 10),
          Expanded(
            child: ListView.builder(
              itemCount: filtered.length,
              itemBuilder: (_, i) => ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 8),
                leading: const CircleAvatar(child: Icon(Icons.movie_creation_outlined)),
                title: Text(filtered[i]),
                subtitle: const Text('Tap to view details'),
                trailing: const Icon(Icons.chevron_right_rounded),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class FriendsScreen extends StatefulWidget {
  const FriendsScreen({super.key});

  @override
  State<FriendsScreen> createState() => _FriendsScreenState();
}

class _FriendsScreenState extends State<FriendsScreen> {
  final Set<String> _following = {'Ava', 'Rehan'};

  final List<Map<String, String>> _friends = const [
    {'name': 'Ava', 'watching': 'Neon Rift'},
    {'name': 'Rehan', 'watching': 'Racer X'},
    {'name': 'Sofia', 'watching': 'Royal Chase'},
    {'name': 'Kabir', 'watching': 'Mumbai Detectives'},
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const FlickerHeader(subtitle: 'See what your friends are streaming'),
          const SizedBox(height: 16),
          Expanded(
            child: ListView.separated(
              itemCount: _friends.length,
              separatorBuilder: (_, __) => const Divider(height: 16),
              itemBuilder: (_, i) {
                final friend = _friends[i];
                final name = friend['name']!;
                final isFollowing = _following.contains(name);

                return ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: CircleAvatar(
                    backgroundColor: Colors.primaries[i % Colors.primaries.length],
                    child: Text(name.substring(0, 1)),
                  ),
                  title: Text(name),
                  subtitle: Text('Watching: ${friend['watching']}'),
                  trailing: FilledButton.tonal(
                    onPressed: () {
                      setState(() {
                        if (isFollowing) {
                          _following.remove(name);
                        } else {
                          _following.add(name);
                        }
                      });
                    },
                    child: Text(isFollowing ? 'Following' : 'Follow'),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const FlickerHeader(subtitle: 'Manage your account and preferences'),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF151A2D),
              borderRadius: BorderRadius.circular(18),
            ),
            child: const Row(
              children: [
                CircleAvatar(radius: 28, child: Icon(Icons.person, size: 30)),
                SizedBox(width: 12),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Guest User',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                    Text('Premium Plan · 4K + Live Sports'),
                  ],
                )
              ],
            ),
          ),
          const SizedBox(height: 18),
          const _SettingTile(icon: Icons.download_rounded, title: 'Downloads'),
          const _SettingTile(icon: Icons.language_rounded, title: 'Language & Subtitles'),
          const _SettingTile(icon: Icons.notifications_active_rounded, title: 'Notifications'),
          const _SettingTile(icon: Icons.devices_rounded, title: 'Manage Devices'),
          const Spacer(),
          SizedBox(
            width: double.infinity,
            child: FilledButton(
              onPressed: () {},
              child: const Text('Upgrade Plan'),
            ),
          ),
        ],
      ),
    );
  }
}

class _SettingTile extends StatelessWidget {
  const _SettingTile({required this.icon, required this.title});

  final IconData icon;
  final String title;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 10),
      color: const Color(0xFF151A2D),
      child: ListTile(
        leading: Icon(icon),
        title: Text(title),
        trailing: const Icon(Icons.chevron_right_rounded),
      ),
    );
  }
}
