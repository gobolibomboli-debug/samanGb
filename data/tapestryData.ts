import { ArchetypeId, RelationType } from '../types';

export type DeityType = 'Primordial' | 'Titan' | 'Olympian' | 'Deity';

export interface TapestryNode {
    id: string;
    name: string;
    type: DeityType;
    parents?: string[];
    consorts?: string[];
    children?: string[];
    allies?: string[];
    rivals?: string[];
    complement?: string[];
}

export const TAPESTRY_DATA: Record<string, TapestryNode> = {
    // --- PRIMORDIALS ---
    Chaos: { id: 'Chaos', name: 'Chaos', type: 'Primordial', children: ['Gaia', 'Tartarus', 'Eros', 'Nyx'] },
    Gaia: { id: 'Gaia', name: 'Gaia', type: 'Primordial', consorts: ['Uranus'], children: ['Cronus', 'Rhea', 'Iapetus'] },
    Uranus: { id: 'Uranus', name: 'Uranus', type: 'Primordial', consorts: ['Gaia'] },
    Tartarus: { id: 'Tartarus', name: 'Tartarus', type: 'Primordial' },
    Eros: { id: 'Eros', name: 'Eros', type: 'Primordial' },
    Nyx: { id: 'Nyx', name: 'Nyx', type: 'Primordial' },

    // --- TITANS ---
    Cronus: { id: 'Cronus', name: 'Cronus', type: 'Titan', parents: ['Uranus', 'Gaia'], consorts: ['Rhea'], children: ['Hestia', 'Hades', 'Demeter', 'Poseidon', 'Hera', 'Zeus'] },
    Rhea: { id: 'Rhea', name: 'Rhea', type: 'Titan', parents: ['Uranus', 'Gaia'], consorts: ['Cronus'], children: ['Hestia', 'Hades', 'Demeter', 'Poseidon', 'Hera', 'Zeus'] },
    Iapetus: { id: 'Iapetus', name: 'Iapetus', type: 'Titan', parents: ['Uranus', 'Gaia'], children: [ArchetypeId.PROMETHEUS] },
    Leto: { id: 'Leto', name: 'Leto', type: 'Titan', consorts: [ArchetypeId.ZEUS], children: [ArchetypeId.APOLLO, ArchetypeId.ARTEMIS]},

    // --- OLYMPIANS & OTHER DEITIES ---
    [ArchetypeId.ZEUS]: { 
        id: ArchetypeId.ZEUS, name: 'Zeus', type: 'Olympian', parents: ['Cronus', 'Rhea'], 
        consorts: [ArchetypeId.HERA, 'Leto', ArchetypeId.DEMETER], 
        children: [ArchetypeId.ARES, ArchetypeId.HEPHAESTUS, ArchetypeId.ATHENA, ArchetypeId.APOLLO, ArchetypeId.ARTEMIS, ArchetypeId.HERMES, ArchetypeId.DIONYSUS, ArchetypeId.PERSEPHONE],
        rivals: [ArchetypeId.PROMETHEUS, 'Cronus']
    },
    [ArchetypeId.HERA]: { 
        id: ArchetypeId.HERA, name: 'Hera', type: 'Olympian', parents: ['Cronus', 'Rhea'], 
        consorts: [ArchetypeId.ZEUS], 
        children: [ArchetypeId.ARES, ArchetypeId.HEPHAESTUS],
        rivals: [ArchetypeId.APHRODITE, ArchetypeId.DIONYSUS, 'Leto']
    },
    [ArchetypeId.POSEIDON]: { 
        id: ArchetypeId.POSEIDON, name: 'Poseidon', type: 'Olympian', parents: ['Cronus', 'Rhea'],
        consorts: [ArchetypeId.DEMETER],
        rivals: [ArchetypeId.ATHENA],
        allies: [ArchetypeId.HESTIA]
    },
    [ArchetypeId.HADES]: { 
        id: ArchetypeId.HADES, name: 'Hades', type: 'Olympian', parents: ['Cronus', 'Rhea'], 
        consorts: [ArchetypeId.PERSEPHONE],
        rivals: [ArchetypeId.DEMETER],
        allies: [ArchetypeId.HERMES]
    },
    [ArchetypeId.DEMETER]: { 
        id: ArchetypeId.DEMETER, name: 'Demeter', type: 'Olympian', parents: ['Cronus', 'Rhea'], 
        consorts: [ArchetypeId.ZEUS, ArchetypeId.POSEIDON], 
        children: [ArchetypeId.PERSEPHONE],
        rivals: [ArchetypeId.HADES],
        allies: [ArchetypeId.DIONYSUS]
    },
    [ArchetypeId.HESTIA]: { 
        id: ArchetypeId.HESTIA, name: 'Hestia', type: 'Olympian', parents: ['Cronus', 'Rhea'],
        allies: [ArchetypeId.APOLLO, ArchetypeId.POSEIDON],
        complement: [ArchetypeId.HERMES]
    },
    [ArchetypeId.ATHENA]: { 
        id: ArchetypeId.ATHENA, name: 'Athena', type: 'Olympian', parents: [ArchetypeId.ZEUS],
        rivals: [ArchetypeId.ARES, ArchetypeId.POSEIDON],
        allies: [ArchetypeId.HEPHAESTUS, ArchetypeId.ARTEMIS],
        complement: [ArchetypeId.PROMETHEUS]
    },
    [ArchetypeId.ARES]: { 
        id: ArchetypeId.ARES, name: 'Ares', type: 'Olympian', parents: [ArchetypeId.ZEUS, ArchetypeId.HERA], 
        consorts: [ArchetypeId.APHRODITE],
        rivals: [ArchetypeId.ATHENA, ArchetypeId.HEPHAESTUS]
    },
    [ArchetypeId.APOLLO]: { 
        id: ArchetypeId.APOLLO, name: 'Apollo', type: 'Olympian', parents: [ArchetypeId.ZEUS, 'Leto'],
        rivals: [ArchetypeId.DIONYSUS],
        allies: [ArchetypeId.HERMES, ArchetypeId.HESTIA]
    },
    [ArchetypeId.ARTEMIS]: { 
        id: ArchetypeId.ARTEMIS, name: 'Artemis', type: 'Olympian', parents: [ArchetypeId.ZEUS, 'Leto'],
        rivals: [ArchetypeId.APHRODITE],
        allies: [ArchetypeId.ATHENA]
    },
    [ArchetypeId.APHRODITE]: { 
        id: ArchetypeId.APHRODITE, name: 'Aphrodite', type: 'Olympian', parents: ['Uranus'], 
        consorts: [ArchetypeId.HEPHAESTUS, ArchetypeId.ARES],
        rivals: [ArchetypeId.HERA, ArchetypeId.ARTEMIS, ArchetypeId.PERSEPHONE],
        allies: ['Eros']
    },
    [ArchetypeId.HEPHAESTUS]: { 
        id: ArchetypeId.HEPHAESTUS, name: 'Hephaestus', type: 'Olympian', parents: [ArchetypeId.HERA], // Some myths say Hera alone
        consorts: [ArchetypeId.APHRODITE],
        rivals: [ArchetypeId.ARES],
        allies: [ArchetypeId.ATHENA, ArchetypeId.PROMETHEUS]
    },
    [ArchetypeId.HERMES]: { 
        id: ArchetypeId.HERMES, name: 'Hermes', type: 'Olympian', parents: [ArchetypeId.ZEUS],
        allies: [ArchetypeId.APOLLO, ArchetypeId.HADES],
        complement: [ArchetypeId.HESTIA]
    },
    [ArchetypeId.DIONYSUS]: { 
        id: ArchetypeId.DIONYSUS, name: 'Dionysus', type: 'Olympian', parents: [ArchetypeId.ZEUS],
        rivals: [ArchetypeId.APOLLO, ArchetypeId.HERA],
        allies: [ArchetypeId.DEMETER]
    },
    [ArchetypeId.PERSEPHONE]: { 
        id: ArchetypeId.PERSEPHONE, name: 'Persephone', type: 'Deity', parents: [ArchetypeId.ZEUS, ArchetypeId.DEMETER], 
        consorts: [ArchetypeId.HADES],
        rivals: [ArchetypeId.APHRODITE]
    },
    [ArchetypeId.PROMETHEUS]: { 
        id: ArchetypeId.PROMETHEUS, name: 'Prometheus', type: 'Titan', parents: ['Iapetus'],
        rivals: [ArchetypeId.ZEUS],
        allies: [ArchetypeId.HEPHAESTUS],
        complement: [ArchetypeId.ATHENA]
    },
};