interface MenuItem {
  title: string;
  icon: string;
  route: string;
}

export interface MenuGroup {
  groupTitle?: string;
  items: MenuItem[];
}