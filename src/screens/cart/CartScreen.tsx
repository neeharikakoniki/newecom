// src/screens/cart/CartScreen.tsx
import React from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { s, vs } from 'react-native-size-matters';

import AppSaveView from '../../components/views/AppSaveView';
import HomeHeader from '../../components/headers/HomeHeader';
import AppText from '../../components/texts/AppText';
import AppButton from '../../components/buttons/AppButton';

import { useAppDispatch, useAppSelector } from '../../store';
import {
  selectCartArray,
  selectSubtotal,
  incrementQty,
  decrementQty,
  clearCart,
  removeFromCart,
} from '../../store/slices/cartSlice';
import type { TabsParamList } from '../../navigation/MainAppBottomTabs';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartArray);
  const subtotal = useAppSelector(selectSubtotal);

  const navigation = useNavigation<BottomTabNavigationProp<TabsParamList>>();

  return (
    <AppSaveView>
      <HomeHeader />
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.product.id)}
          contentContainerStyle={[
            styles.listContent,
            items.length === 0 && styles.emptyContentPad,
          ]}
          ListEmptyComponent={
            <View style={styles.center}>
              <MaterialCommunityIcons
                name="shopping-outline"
                size={s(100)}
                color="#9aa0a6"
                style={{ marginBottom: vs(10) }}
              />
              <AppText style={{ marginBottom: vs(8) }}>Your cart is empty.</AppText>
              <AppButton
                title="Start Shopping"
                style={{ marginTop: vs(8), width: s(180) }}
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          }
          ItemSeparatorComponent={() => <View style={{ height: vs(10) }} />}
          renderItem={({ item }) => (
            <View style={styles.row}>
              {/* small delete button at top-right */}
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart(item.product.id))}
                style={styles.deleteBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${item.product.title} from cart`}
              >
                <AntDesign name="delete" size={s(16)} color="#fff" />
              </TouchableOpacity>

              {item.product.thumbnail ? (
                <Image source={{ uri: item.product.thumbnail }} style={styles.thumb} />
              ) : (
                <View style={[styles.thumb, styles.thumbPlaceholder]} />
              )}

              <View style={{ flex: 1 }}>
                <AppText variant="bold" numberOfLines={1}>
                  {item.product.title}
                </AppText>
                <AppText style={{ marginTop: vs(4) }}>
                  ${item.product.price.toFixed(2)}
                </AppText>

                <View style={styles.qtyRow}>
                  <AppButton
                    title="-"
                    onPress={() => dispatch(decrementQty(item.product.id))}
                    style={styles.qtyBtn}
                  />
                  <AppText style={{ marginHorizontal: s(10) }}>{item.qty}</AppText>
                  <AppButton
                    title="+"
                    onPress={() => dispatch(incrementQty(item.product.id))}
                    style={styles.qtyBtn}
                  />
                </View>
              </View>
            </View>
          )}
        />

        {items.length > 0 && (
          <View style={styles.footer}>
            <AppText variant="bold">Subtotal: ${subtotal.toFixed(2)}</AppText>
            <AppButton title="Clear Cart" onPress={() => dispatch(clearCart())} />
          </View>
        )}
      </View>
    </AppSaveView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: s(12) },
  listContent: { paddingBottom: vs(100) },
  emptyContentPad: { flexGrow: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  row: {
    position: 'relative', // ⬅️ needed for absolute delete button
    flexDirection: 'row',
    gap: s(10),
    padding: s(10),
    borderWidth: 1,
    borderColor: '#e6e6e6',
    backgroundColor: '#fff',
    borderRadius: s(12),
  },

  // small round delete chip in top-right corner
  deleteBtn: {
    position: 'absolute',
    top: s(8),
    right: s(8),
    width: s(28),
    height: s(28),
    borderRadius: s(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e53935',
    zIndex: 1,
  },

  thumb: {
    width: s(72),
    height: s(72),
    borderRadius: s(8),
    backgroundColor: '#f3f3f3',
  },
  thumbPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: vs(8) },
  qtyBtn: { width: s(40), height: vs(36), borderRadius: s(10) },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: s(12),
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    gap: vs(8),
  },
});
