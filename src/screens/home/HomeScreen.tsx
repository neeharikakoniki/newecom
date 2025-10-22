import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Image } from 'react-native';
import AppSaveView from '../../components/views/AppSaveView';
import HomeHeader from '../../components/headers/HomeHeader';
import AppText from '../../components/texts/AppText';
import AppButton from '../../components/buttons/AppButton';
import { s, vs } from 'react-native-size-matters';
import { showMessage } from 'react-native-flash-message';
import { Product } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../store';
import { addToCart } from '../../store/slices/cartSlice';
import { AppColors } from '../../styles/colors';

const API = 'https://dummyjson.com/products?limit=20';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setErr(null);
      const res = await fetch(API);
      const json = await res.json();
      // map to our Product type
      const products: Product[] = (json?.products ?? []).map((p: any) => ({
        id: p.id,
        title: p.title,
        price: Number(p.price) || 0,
        description: p.description,
        thumbnail: p.thumbnail,
      }));
      setData(products);
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onAdd = (item: Product) => {
    dispatch(addToCart(item));
    showMessage({ message: `${item.title} added to cart`, type: 'success' });
  };

  if (loading) {
    return (
      <AppSaveView>
        <HomeHeader />
        <View style={styles.center}>
          <ActivityIndicator />
          <AppText style={{ marginTop: vs(10) }}>Loading products...</AppText>
        </View>
      </AppSaveView>
    );
  }

  if (err) {
    return (
      <AppSaveView>
        <HomeHeader />
        <View style={styles.center}>
          <AppText style={{ marginBottom: vs(8) }}>{err}</AppText>
          <AppButton title="Retry" onPress={fetchProducts} />
        </View>
      </AppSaveView>
    );
  }

  return (
    <AppSaveView>
      <HomeHeader />
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: s(12), paddingBottom: vs(20) }}
        ItemSeparatorComponent={() => <View style={{ height: vs(10) }} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.thumbnail ? (
              <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            ) : null}
            <View style={{ flex: 1 }}>
              <AppText variant="bold" numberOfLines={1}>{item.title}</AppText>
              <AppText style={{ marginTop: vs(4), color: AppColors?.black }}>
                ${item.price.toFixed(2)}
              </AppText>
              <AppButton
                title="Add to Cart"
                style={{ marginTop: vs(8) }}
                onPress={() => onAdd(item)}
              />
            </View>
          </View>
        )}
      />
    </AppSaveView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: s(12),
    padding: s(10),
    backgroundColor: '#fff',
    gap: s(10),
  },
  thumb: {
    width: s(72),
    height: s(72),
    borderRadius: s(8),
    backgroundColor: '#f3f3f3',
  },
});
