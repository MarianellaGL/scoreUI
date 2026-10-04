import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { tokens } from '../theme';

export type ScoreTab = 'home' | 'library' | 'new-game' | 'score' | 'profile';
export type ScoreBottomNavProps = {
  active: ScoreTab;
  onSelect?: (tab: ScoreTab) => void;
};

const items: { key: ScoreTab; label: string; accessibilityLabel: string; icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'] }[] = [
  { key: 'home', label: 'Inicio', accessibilityLabel: 'Inicio', icon: 'home-outline' },
  { key: 'library', label: 'Biblioteca', accessibilityLabel: 'Biblioteca' },
  { key: 'new-game', label: 'Nuevo', accessibilityLabel: 'Nueva partida' },
  { key: 'score', label: 'Partidas', accessibilityLabel: 'Partidas', icon: 'file-document-edit-outline' },
  { key: 'profile', label: 'Perfil', accessibilityLabel: 'Perfil', icon: 'account-outline' },
];

function LibraryIcon({ color }: { color: string }) {
  return <View style={styles.libraryIcon} accessible={false}>
    <View style={[styles.book, styles.bookOne, { borderColor: color }]} />
    <View style={[styles.book, styles.bookTwo, { borderColor: color }]} />
    <View style={[styles.book, styles.bookThree, { borderColor: color }]} />
  </View>;
}

function NewGameIcon() {
  return <View style={styles.createAction} accessible={false}>
    <View style={[styles.pip, styles.topLeft]} />
    <View style={[styles.pip, styles.topRight]} />
    <View style={[styles.pip, styles.bottomLeft]} />
    <View style={[styles.pip, styles.bottomRight]} />
    <MaterialCommunityIcons name="plus" size={29} color={tokens.color.canvas} />
  </View>;
}

export function ScoreBottomNav({ active, onSelect }: ScoreBottomNavProps) {
  return <View style={styles.nav}>
    {items.map((item) => {
      const selected = item.key === active;
      const center = item.key === 'new-game';
      const tint = selected ? tokens.color.gold : tokens.color.secondaryText;
      return <Pressable
        key={item.key}
        accessibilityRole="tab"
        accessibilityState={{ selected }}
        accessibilityLabel={item.accessibilityLabel}
        onPress={() => onSelect?.(item.key)}
        style={({ pressed }) => [styles.item, center && styles.centerItem, pressed && styles.pressed]}
      >
        {center ? <NewGameIcon /> : item.key === 'library' ? <LibraryIcon color={tint} /> : <MaterialCommunityIcons name={item.icon!} size={24} color={tint} />}
        <Text numberOfLines={1} style={[styles.label, { color: center ? tokens.color.primaryText : tint }]}>{item.label}</Text>
        {selected && <View style={styles.indicator} />}
        {selected && item.key === 'score' && <View style={styles.liveDot} />}
      </Pressable>;
    })}
  </View>;
}

const styles = StyleSheet.create({
  nav: { minHeight: 84, backgroundColor: tokens.color.surface, borderTopColor: tokens.color.border, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  item: { minHeight: 72, flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  centerItem: { flex: 1.38 },
  pressed: { opacity: 0.7 },
  label: { fontFamily: tokens.font.medium, fontSize: 12, lineHeight: 18, letterSpacing: 0.4, textAlign: 'center' },
  indicator: { width: 24, height: 3, borderRadius: 2, backgroundColor: tokens.color.brand },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: tokens.color.success, position: 'absolute', bottom: 6, right: 15 },
  createAction: { width: 44, height: 44, borderRadius: 12, backgroundColor: tokens.color.brand, alignItems: 'center', justifyContent: 'center' },
  pip: { position: 'absolute', width: 3, height: 3, borderRadius: 2, backgroundColor: tokens.color.canvas },
  topLeft: { left: 7, top: 7 },
  topRight: { right: 7, top: 7 },
  bottomLeft: { left: 7, bottom: 7 },
  bottomRight: { right: 7, bottom: 7 },
  libraryIcon: { width: 24, height: 24 },
  book: { position: 'absolute', borderWidth: 1.5, borderRadius: 1, width: 5 },
  bookOne: { left: 3, top: 4, height: 16 },
  bookTwo: { left: 9, top: 3, height: 17 },
  bookThree: { left: 15, top: 5, height: 15 },
});
