import React from 'react';
import HeroSection from './section/HeroSection';

import ReadySection from '../public_Home/section/ReadySection';
import InnovationSection from './section/InnovationSection';
import {
  BarChart3,
  Brain,
  Clock,
  DollarSign,
  Download,
  FileText,
  Filter,
  Home,
  Layers,
  MapPin,
  PieChart,
  Search,
  Shield,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import StepsSection from './section/StepsSection';
import AIPowerSection from './section/AIPowerSection';
import BestPracticesSection from './section/BestPracticesSection';
import DealHunterWebsite from './section/Innovation';
const steps = [
  {
    id: 1,
    title: 'Define Your Objective',
    description:
      'Set your investment timeline and profit goal. These inputs guide the entire strategy and ensure alignment with your goals.',
    icon: Target,
    features: ['Set timeline', 'Define profit targets', 'Align risk tolerance'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'Choose Investment Type',
    description:
      'Select land, residential, or commercial real estate. The platform adapts analysis based on your chosen asset class.',
    icon: Home,
    features: ['Land investments', 'Residential properties', 'Commercial real estate'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Select Investment Approach',
    description:
      'Define your operational strategy: flipping, holding, subdividing, or reselling parcels.',
    icon: TrendingUp,
    features: ['Fix and flip', 'Buy and hold', 'Subdivide land', 'Resell parcels'],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    title: 'Confirm Starting Capital',
    description:
      'Enter your investment amount. Deal Hunter adjusts strategies to match your capital level.',
    icon: DollarSign,
    features: ['Capital assessment', 'Budget planning', 'ROI projections'],
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: 5,
    title: 'Select Target Area',
    description:
      'Specify state, city, or county. Strategies are anchored in real market conditions.',
    icon: MapPin,
    features: ['Geographic targeting', 'Market analysis', 'Local regulations'],
    gradient: 'from-red-500 to-rose-500',
  },
  {
    id: 6,
    title: 'Strategy Generation',
    description:
      'AI builds structured strategies with property estimates, step-by-step actions, and profit projections.',
    icon: PieChart,
    features: ['Property count estimates', 'Risk classification', 'Profit path projection'],
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 7,
    title: 'Compare Strategies',
    description:
      'View multiple strategies side-by-side to understand tradeoffs and choose clear direction.',
    icon: BarChart3,
    features: ['Side-by-side comparison', 'Risk-reward analysis', 'Resource requirements'],
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    id: 8,
    title: 'Addvanced Analysis',
    description:
      'Optional deep insights: tax considerations, land constraints, or portfolio balance guidance.',
    icon: Filter,
    features: ['Tax implications', 'Zoning regulations', 'Portfolio optimization'],
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 9,
    title: 'Export for Execution',
    description: 'Generate Excel spreadsheets and Word documents with strategies and next steps.',
    icon: Download,
    features: ['Excel exports', 'Word documents', 'Execution templates'],
    gradient: 'from-pink-500 to-rose-500',
  },
];
const aiFeatures = [
  {
    title: 'Intelligent Input Interpretation',
    description: 'Contextual understanding of your goals and constraints',
    icon: Brain,
  },
  {
    title: 'Dynamic Market Analysis',
    description: 'Real-time search and assessment of market opportunities',
    icon: Search,
  },
  {
    title: 'Structured Strategy Development',
    description: 'Logical framework creation based on proven investment principles',
    icon: Layers,
  },
  {
    title: 'Clear Results Presentation',
    description: 'Consistent, understandable outputs for confident decision-making',
    icon: FileText,
  },
];

const bestPractices = [
  {
    title: 'Provide Clear Inputs',
    description:
      'Be specific about objectives and constraints. Realistic parameters yield actionable strategies.',
    icon: Users,
  },
  {
    title: 'Compare Multiple Strategies',
    description:
      'Never settle on the first option. Evaluate different risk profiles and approaches.',
    icon: Shield,
  },
  {
    title: 'Utilize Export Features',
    description: 'Document your decision-making process and track execution against plans.',
    icon: Clock,
  },
];

const InnovationView = () => {
  return (
    <>
      <HeroSection />
      <InnovationSection />
      <StepsSection steps={steps} />
      <AIPowerSection aiFeatures={aiFeatures} />
      <BestPracticesSection bestPractices={bestPractices} />
      <DealHunterWebsite />
      <ReadySection />
    </>
  );
};

export default InnovationView;
