// Type definitions for PORTS.Picker
// Project: PORTS.Picker
// Definitions by: Jeremy Travis <mailto:Jeremy.Travis@fbport.com>
// v1.0.2

interface PickerOptions {
    id?: string;
    title?: string;
    group?: string;
    buttonTemplate?: string;
    data?: any;
    ajax?: boolean;
    multiSelect?: boolean;
    isSubModal?: boolean;
    url?: string;
    callback?: any;
}

interface JQuery {
    //Picker: any; // <- this is a quick reference for JQuery plugins
    Picker(options?: PickerOptions): JQuery;
}

declare module "Picker" {
}