import { Job } from '@/data/jobs';
import { Product } from '@/data/products';

const API_URL = `${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:4000'}/api`;

export async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_URL}/jobs?limit=100&t=${Date.now()}`, {
      cache: 'no-store', // Always fetch fresh data for jobs to ensure admin panel changes reflect immediately
    });
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const json = await res.json();
    return json.docs || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // Fallback to empty array on error so UI doesn't crash
    return [];
  }
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products?limit=100&t=${Date.now()}`, {
      cache: 'no-store', // Always fetch fresh data for products
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const json = await res.json();
    
    // Flatten Payload nested structure back to expected frontend shape
    return (json.docs || []).map((doc: any) => ({
      ...doc,
      features: doc.features?.map((f: any) => f.feature) || [],
      idealFor: doc.idealFor?.map((i: any) => i.audience) || [],
      paymentOptions: doc.paymentOptions?.map((po: any) => ({
        ...po,
        monthlyFeatures: po.monthlyFeatures?.map((f: any) => f.feature),
        yearlyFeatures: po.yearlyFeatures?.map((f: any) => f.feature),
        features: po.features?.map((f: any) => f.feature),
      })) || []
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export interface NavLink {
  name: string;
  href: string;
  id?: string;
}

export interface NavbarData {
  links: NavLink[];
}

export async function fetchNavbar(): Promise<NavbarData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/navbar?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch navbar');
    return await res.json();
  } catch (error) {
    console.error('Error fetching navbar:', error);
    return null;
  }
}

export interface HeroLogo {
  id?: string;
  name: string;
  logo: any; // Media object
  size: number;
  left?: string;
  top?: string;
  zIndex?: number;
}

export interface HeroLogosData {
  logos: HeroLogo[];
}

export async function fetchHeroLogos(): Promise<HeroLogosData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/hero-logos?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch hero logos');
    return await res.json();
  } catch (error) {
    console.error('Error fetching hero logos:', error);
    return null;
  }
}

export interface HomeHeroData {
  headingLine1: string;
  headingLine2: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export async function fetchHomeHero(): Promise<HomeHeroData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/home-hero?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch home hero');
    return await res.json();
  } catch (error) {
    console.error('Error fetching home hero:', error);
    return null;
  }
}

export interface StatItem {
  id?: string;
  value: string;
  label: string;
}

export interface StatsBarData {
  stats: StatItem[];
}

export async function fetchStatsBar(): Promise<StatsBarData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/stats-bar?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch stats bar');
    return await res.json();
  } catch (error) {
    console.error('Error fetching stats bar:', error);
    return null;
  }
}

export interface ExpertiseCard {
  id?: string;
  title: string;
  description: string;
  product: any; // Populated Product
}

export interface ExpertiseData {
  headingLine1: string;
  headingLine2: string;
  cards: ExpertiseCard[];
}

export async function fetchExpertise(): Promise<ExpertiseData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/expertise?depth=1&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch expertise');
    return await res.json();
  } catch (error) {
    console.error('Error fetching expertise:', error);
    return null;
  }
}

export interface AboutSectionData {
  visionHeading: string;
  visionDescription: string;
  missionHeading: string;
  missionDescription: string;
  visionImage?: { url: string } | null;
  cultureHeading: string;
  cultureDescription: string;
  cultureButtonText: string;
  cultureButtonLink: string;
  cultureImage?: { url: string } | null;
}

export async function fetchAboutSection(): Promise<AboutSectionData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/about-section?t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch about section');
    return await res.json();
  } catch (error) {
    console.error('Error fetching about section:', error);
    return null;
  }
}

export interface FooterLink {
  id?: string;
  label: string;
  linkType: 'custom' | 'product' | 'job';
  url?: string;
  product?: {
    id: string;
    slug: string;
    name: string;
  } | string | null;
  job?: {
    id: string;
    slug: string;
    title: string;
  } | string | null;
  newTab?: boolean;
}

export interface FooterColumn {
  id?: string;
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  id?: string;
  platform: 'linkedin' | 'instagram' | 'whatsapp' | 'email' | 'custom';
  url: string;
}

export interface FooterData {
  description: string;
  socialLinks: FooterSocialLink[];
  columns: FooterColumn[];
  copyright: string;
  bottomLinks: FooterLink[];
}

export async function fetchFooter(): Promise<FooterData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/footer?depth=1&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch footer');
    return await res.json();
  } catch (error) {
    console.error('Error fetching footer:', error);
    return null;
  }
}

export interface TechItem {
  id?: string;
  name: string;
  logo?: {
    url: string;
    alt: string;
  } | string | null;
}

export interface TechCategory {
  id?: string;
  name: string;
  items: TechItem[];
}

export interface TechnologiesData {
  categories: TechCategory[];
}

export async function fetchTechnologies(): Promise<TechnologiesData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/technologies?depth=1&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch technologies');
    return await res.json();
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return null;
  }
}

export interface AboutServiceItem {
  id?: string;
  title: string;
  desc: string;
  icon: 'layout-grid' | 'message-square' | 'bot' | 'phone-call' | 'workflow' | 'sparkles';
}

export interface AboutFeatureItem {
  id?: string;
  title: string;
  icon: 'sparkles' | 'gauge' | 'circle-user' | 'headset' | 'shield-check';
}

export interface AboutUsPageData {
  heading: string;
  description: string;
  servicesSectionTitle: string;
  services: AboutServiceItem[];
  whyChooseUsTitle: string;
  features: AboutFeatureItem[];
  bottomStatement: string;
}

export interface ContactInfoItem {
  id?: string;
  label: string;
  value: string;
  href: string;
  icon: 'map-pin' | 'mail' | 'phone' | 'linkedin';
}

export interface ContactPageData {
  heading: string;
  description: string;
  contactInfo: ContactInfoItem[];
  formTitle: string;
}

export async function fetchAboutUsPage(): Promise<AboutUsPageData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/about-us-page?depth=1&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch about us page');
    return await res.json();
  } catch (error) {
    console.error('Error fetching about us page:', error);
    return null;
  }
}

export async function fetchContactPage(): Promise<ContactPageData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/contact-page?depth=1&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch contact page');
    return await res.json();
  } catch (error) {
    console.error('Error fetching contact page:', error);
    return null;
  }
}

export interface ProductsPageData {
  badge: string;
  heading: string;
  description: string;
}

export async function fetchProductsPage(): Promise<ProductsPageData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/products-page?depth=1&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch products page');
    return await res.json();
  } catch (error) {
    console.error('Error fetching products page:', error);
    return null;
  }
}

export interface CareersPagePerk {
  id?: string;
  name: string;
}

export interface CareersPageData {
  badge: string;
  heading: string;
  description: string;
  perks?: CareersPagePerk[];
}

export async function fetchCareersPage(): Promise<CareersPageData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/careers-page?depth=1&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch careers page');
    return await res.json();
  } catch (error) {
    console.error('Error fetching careers page:', error);
    return null;
  }
}

export interface CulturePageValue {
  id?: string;
  title: string;
  text: string;
}

export interface CulturePageData {
  badge: string;
  heading: string;
  description: string;
  bentoWideTitle: string;
  bentoWideDescription: string;
  bentoAccentTitle: string;
  values?: CulturePageValue[];
}

export async function fetchCulturePage(): Promise<CulturePageData | null> {
  try {
    const res = await fetch(`${API_URL}/globals/culture-page?depth=1&t=${Date.now()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch culture page');
    return await res.json();
  } catch (error) {
    console.error('Error fetching culture page:', error);
    return null;
  }
}



