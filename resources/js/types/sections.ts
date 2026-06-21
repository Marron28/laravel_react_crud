export interface PageSectionSetting {
    id: number;
    subtitle: string | null;
    is_visible: boolean;
}

export interface PageSection {
    id: number;
    name: string;
    setting?: PageSectionSetting | null;
}
