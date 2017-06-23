// Type definitions for MI.Picker
// Project: MI.Picker
// Definitions by: Jeremy Travis <mailto:jtravis28@gmail.com>
// v1.0.4

interface PickerOptions {
    id?: string;
    title?: string;
    group?: string;
    buttonTemplate?: string;
    data?: any;
    ajax?: boolean;
    multiSelect?: boolean;
    isSubModal?: boolean;
    showBlank?: boolean;
    url?: string;
    onSelected?: any;
}

interface JQuery {
    //Picker: any; // <- this is a quick reference for JQuery plugins
    Picker(options?: PickerOptions): JQuery;
}

declare module "Picker" {
}