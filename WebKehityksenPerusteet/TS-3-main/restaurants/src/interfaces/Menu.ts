interface WeeklyMenu {
    days: DayMenu[];
}

interface DayMenu {
    date: string;
    courses: Course[];
}

interface Menu {
    courses: Course[];
}

interface Course {
    price: string;
    name: string;
    diets: string[];
}

export type { Menu, WeeklyMenu, DayMenu, Course }
