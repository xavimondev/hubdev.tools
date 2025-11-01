'use client'

import {
  Sparkles,
  Plug,
  Accessibility,
  BarChart3,
  Clapperboard,
  Lock,
  FileText,
  Puzzle,
  PieChart,
  BookOpen,
  Database,
  BookMarked,
  Globe,
  Mail,
  Layers,
  Type,
  FormInput,
  Boxes,
  Server,
  Shapes,
  Palette,
  Lightbulb,
  Newspaper,
  Gauge,
  CheckSquare,
  HardDrive,
  FlaskConical,
  Bell,
  Wrench,
  LayoutDashboard,
  Search,
  Heart
} from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/styles'

const categories = [
  { id: 'ai', icon: Sparkles },
  { id: 'apis', icon: Plug },
  { id: 'accessibility', icon: Accessibility },
  { id: 'analytics', icon: BarChart3 },
  { id: 'animation', icon: Clapperboard },
  { id: 'authentication', icon: Lock },
  { id: 'cms', icon: FileText },
  { id: 'challenges', icon: Puzzle },
  { id: 'charts', icon: PieChart },
  { id: 'course', icon: BookOpen },
  { id: 'database', icon: Database },
  { id: 'documentation', icon: FileText },
  { id: 'domain', icon: Globe },
  { id: 'email', icon: Mail },
  { id: 'extensions', icon: Layers },
  { id: 'font', icon: Type },
  { id: 'forms', icon: FormInput },
  { id: 'frameworks', icon: Boxes },
  { id: 'hosting', icon: Server },
  { id: 'icon', icon: Shapes },
  { id: 'illustration', icon: Palette },
  { id: 'inspiration', icon: Lightbulb },
  { id: 'newsletter', icon: Newspaper },
  { id: 'performance', icon: Gauge },
  { id: 'productivity', icon: CheckSquare },
  { id: 'books', icon: BookMarked },
  { id: 'storage', icon: HardDrive },
  { id: 'testing', icon: FlaskConical },
  { id: 'toast', icon: Bell },
  { id: 'tool', icon: Wrench },
  { id: 'ui', icon: LayoutDashboard },
  { id: 'discover', icon: Search },
  { id: 'favorites', icon: Heart }
]

function getIconBySlug({ slug }: { slug: string }) {
  return categories.find((cat) => cat.id === slug)!.icon
}

type CategoryProps = {
  name: string
  slug: string
  href: string
}

export function CategoryPill({ name, slug, href }: CategoryProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const Icon = getIconBySlug({ slug })

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-2 rounded-xl backdrop-filter text-sm whitespace-nowrap text-foreground backdrop-blur-sm',
        isActive
          ? 'bg-light-700/50 dark:bg-white/5 text-purple-300 border dark:border-purple-300/20'
          : 'hover:bg-light-600/40 dark:hover:bg-purple-300/10 dark:hover:text-purple-300 dark:hover:border-purple-300/20'
      )}
    >
      <Icon className='size-4' />
      <span>{name}</span>
    </Link>
  )
}
