export const items = [
    {
        label: 'שיעורים',
        icon: 'pi pi-home',
        template: itemRenderer,
        items: [
            {
                label: 'הקלטות',
                icon: 'pi pi-bolt',
                // shortcut: '⌘+S',
                template: itemRenderer
            },
            {
                label: 'הסרטות',
                icon: 'pi pi-server',
                // shortcut: '⌘+B',
                template: itemRenderer
            },
            {
                label: 'מאמרים',
                icon: 'pi pi-pencil',
                // shortcut: '⌘+U',
                template: itemRenderer
            },
            {
                separator: true
            },]
    },
    {
        label:'דיונים' ,
        icon: 'pi pi-star',
        template: itemRenderer,
        url:'discussions'
    },
    {
        label: 'אזור אישי',
        icon: 'pi pi-star',
        url:'./presonalArea',
        template: itemRenderer,
    },
    {
        label: 'דף הבית',
        icon: 'pi pi-search',
        url:'./',
        template: itemRenderer,
    }
];