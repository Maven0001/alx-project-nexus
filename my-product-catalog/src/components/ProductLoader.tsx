"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { fetchProducts } from "../store/productSlice";

export default function ProductLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return null;
}
