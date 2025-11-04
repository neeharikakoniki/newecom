import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { s, vs } from "react-native-size-matters";
import { showMessage } from "react-native-flash-message";
import { Product } from "../../store/slices/cartSlice";
import { useAppDispatch } from "../../store";
import { addToCart } from "../../store/slices/cartSlice";
import { AppColors } from "../../styles/colors";
import { useTranslation } from "react-i18next";
import { triggerCartNotification } from '../../utils/notifications';
import { useAppSelector } from "../../store";

const API = "https://dummyjson.com/products?limit=50";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector((s) => s.network.isConnected);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();


  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API);
      const json = await res.json();

      const mapped: Product[] = (json?.products ?? []).map((p: any) => ({
        id: p.id,
        title: p.title,
        price: Number(p.price) || 0,
        description: p.description || "",
        thumbnail: p.thumbnail,
      }));

      setProducts(mapped);
      setFilteredProducts(mapped);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts(products);
    } else {
      const lower = search.toLowerCase();
      const filtered = products.filter((item) => {
        const title = item.title?.toLowerCase() ?? "";
        const desc = item.description?.toLowerCase() ?? "";
        return title.includes(lower) || desc.includes(lower);
      });
      setFilteredProducts(filtered);
    }
  }, [search, products]);


  const onAdd = (item: Product) => {
    if (!isConnected) {
      showMessage({
        message: "You're offline. Please reconnect to add items to cart.",
        type: "warning",
      });
      return;
    }

    dispatch(addToCart(item));
    showMessage({ message: `${item.title} added to cart`, type: "success" });
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


  if (error) {
    return (
      <AppSaveView>
        <HomeHeader />
        <View style={styles.center}>
          <AppText style={{ marginBottom: vs(8) }}>{error}</AppText>
          <AppButton title="Retry" onPress={fetchProducts} />
        </View>
      </AppSaveView>
    );
  }

  return (
    <AppSaveView>
      <HomeHeader />

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for products..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: s(12), paddingBottom: vs(20) }}
        ListEmptyComponent={() => (
          <AppText style={styles.noResults}>No products found</AppText>
        )}
        ItemSeparatorComponent={() => <View style={{ height: vs(10) }} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.thumbnail ? (
              <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            ) : null}
            <View style={{ flex: 1 }}>
              <AppText variant="bold" numberOfLines={1}>
                {item.title}
              </AppText>
              <AppText
                style={{ marginTop: vs(4), color: AppColors?.black }}
              >{`$${item.price.toFixed(2)}`}</AppText>
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
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  searchContainer: {
    paddingHorizontal: s(12),
    paddingTop: vs(8),
    paddingBottom: vs(6),
    backgroundColor: AppColors.white,
  },
  searchInput: {
    height: vs(42),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: s(25),
    paddingHorizontal: s(15),
    backgroundColor: "#f9f9f9",
    fontSize: s(15),
    color: AppColors.black,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: s(12),
    padding: s(10),
    backgroundColor: "#fff",
    gap: s(10),
  },
  thumb: {
    width: s(72),
    height: s(72),
    borderRadius: s(8),
    backgroundColor: "#f3f3f3",
  },
  noResults: {
    textAlign: "center",
    marginTop: vs(20),
    color: "#888",
  },
});

