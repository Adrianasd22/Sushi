import { Component, computed, effect, inject, signal } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product.service';
import { PageHero } from '../../components/shared/page-hero/page-hero';
import { Category } from '../../interfaces/category.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-menu-page',
  imports: [PageHero, ProductCard, TitleCasePipe],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {

  // ============================
  // 🔧 INYECCIONES
  // ============================
  productService = inject(ProductService);

  // ============================
  // 📦 STATE GLOBAL (service)
  // ============================
  products = this.productService.products;
  categories = this.productService.categories;
  categoriesWithProducts = this.productService.categoriesWithProducts;

  // ============================
  // 🧠 STATE LOCAL
  // ============================

  searchTerm = signal('');
  selectedCategory = signal<number>(0); // 👈 0 = "Todos"

  loading = signal(true);
  error = signal(false);

  initialized = signal(false); // 👈 evita filtrado antes de cargar

  // ============================
  // 🧠 COMPUTED
  // ============================

  categoriesWithAll = computed(() => [
    { id: 0, name: 'Todos' },
    ...this.categories()
  ]);

  isFiltering = computed(() => {
    return this.selectedCategory() !== 0 || this.searchTerm().trim().length > 0;
  });

  // ============================
  // 🚀 INIT
  // ============================

  constructor() {

    this.loading.set(true);

    // 🔹 1. Cargar categorías (botones)
    this.productService.loadCategories().subscribe();
    this.productService.loadProducts().subscribe();

    // 🔹 2. Cargar productos (IndexedDB o API)
    this.productService.loadCategoriesWithProducts().subscribe({
      next: () => {
        this.loading.set(false);
        this.initialized.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });

    // 🔹 3. FILTRADO LOCAL (reactivo)
    effect(() => {

      if (!this.initialized()) return;

      const category = this.selectedCategory();
      const search = this.searchTerm();

      this.productService.filterLocal(category, search);

    });

    effect(() => {
      console.log('ALL PRODUCTS:', this.productService['allProducts']());
      console.log('FILTERED:', this.products());
    });

  }

  // ============================
  // 🎯 ACCIONES
  // ============================

  selectCategory(id: number) {
    this.selectedCategory.set(id);
  }

  updateSearch(value: string) {
    this.searchTerm.set(value);
  }

}