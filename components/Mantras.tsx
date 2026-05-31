export const MANTRAS = {
    shiva: {
        title: "Shiva",
        text: "ॐ नमः शिवाय",
    },

    hareKrishna: {
        title: "Hare Krishna",
        text: `हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ।
            हरे राम हरे राम राम राम हरे हरे ॥`,
    },

    rama: {
        title: "Rama",
        text: "श्री राम जय राम जय जय राम",
    },

    vishnu: {
        title: "Vishnu",
        text: "ॐ नमो भगवते वासुदेवाय",
    },

    hanuman: {
        title: "Hanuman",
        text: "ॐ हं हनुमते नमः",
    },

    durga: {
        title: "Durga",
        text: "ॐ दुं दुर्गायै नमः",
    },

    ganesha: {
        title: "Ganesha",
        text: "ॐ गं गणपतये नमः",
    },

    mahamrityunjaya: {
        title: "Mahamrityunjaya",
        text: `ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।
            उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥`,
    },
} as const;

export type MantraKey = keyof typeof MANTRAS;