import { Archetype, ArchetypeId } from '../types';

const allDeityProfiles: Record<string, Archetype> = {
  // --- PRIMORDIALS ---
  Chaos: {
    id: 'Chaos', name: 'Chaos', gender: 'male', domain: 'The Void & Potential', mbtiMapping: ['INTP'],
    strengths: ['Unbounded Potential', 'Source of Creativity', 'Unconventional Thinking', 'Adaptable'],
    shadows: ['Formlessness', 'Unpredictability', 'Lack of Structure', 'Can be Destructive'],
    mythos: { summaryKey: 'Chaos_myth', constellation: [
      { titleKey: 'chaos_myth_1_title', descriptionKey: 'chaos_myth_1_desc'},
      { titleKey: 'chaos_myth_2_title', descriptionKey: 'chaos_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Chaos_domain', symbols: [
        { iconId: 'void', titleKey: 'chaos_symbol_1_title', descriptionKey: 'chaos_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Chaos_legacy', modernEchoes: [
        { echoKey: 'chaos_echo_1_title', explanationKey: 'chaos_echo_1_desc'},
    ], archetypalMirrorKey: 'Chaos_mirror_desc' },
  },
  Tartarus: {
    id: 'Tartarus', name: 'Tartarus', gender: 'male', domain: 'The Abyss & The Unconscious Depths', mbtiMapping: ['INTJ'],
    strengths: ['Deeply Grounded', 'Contains Destructive Forces', 'Understands Consequences', 'Foundationally Strong'],
    shadows: ['Hopelessness', 'Punitive', 'Inescapable Gloom', 'Isolation'],
    mythos: { summaryKey: 'Tartarus_myth', constellation: [
      { titleKey: 'tartarus_myth_1_title', descriptionKey: 'tartarus_myth_1_desc'},
      { titleKey: 'tartarus_myth_2_title', descriptionKey: 'tartarus_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Tartarus_domain', symbols: [
        { iconId: 'abyss', titleKey: 'tartarus_symbol_1_title', descriptionKey: 'tartarus_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Tartarus_legacy', modernEchoes: [
        { echoKey: 'tartarus_echo_1_title', explanationKey: 'tartarus_echo_1_desc'},
    ], archetypalMirrorKey: 'Tartarus_mirror_desc' },
  },
  Eros: {
    id: 'Eros', name: 'Eros', gender: 'male', domain: 'Primal Love & Creation', mbtiMapping: ['ENFP'],
    strengths: ['Unifying Force', 'Catalyst for Creation', 'Passionate', 'Irresistibly Attractive'],
    shadows: ['Chaotic Desire', 'Amoral', 'Lack of Discrimination', 'Overwhelming'],
    mythos: { summaryKey: 'Eros_myth', constellation: [
      { titleKey: 'eros_myth_1_title', descriptionKey: 'eros_myth_1_desc'},
    ]},
    domains: { summaryKey: 'Eros_domain', symbols: [
        { iconId: 'cosmic_wings', titleKey: 'eros_symbol_1_title', descriptionKey: 'eros_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Eros_legacy', modernEchoes: [
        { echoKey: 'eros_echo_1_title', explanationKey: 'eros_echo_1_desc'},
    ], archetypalMirrorKey: 'Eros_mirror_desc' },
  },
  Nyx: {
    id: 'Nyx', name: 'Nyx', gender: 'female', domain: 'Night & Mystery', mbtiMapping: ['INFJ'],
    strengths: ['Mysterious', 'Powerful', 'Brings Rest and Peace', 'Keeper of Secrets'],
    shadows: ['Deceptive', 'Shrouding', 'Mother of Dark Forces', 'Unknowable'],
    mythos: { summaryKey: 'Nyx_myth', constellation: [
      { titleKey: 'nyx_myth_1_title', descriptionKey: 'nyx_myth_1_desc'},
      { titleKey: 'nyx_myth_2_title', descriptionKey: 'nyx_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Nyx_domain', symbols: [
        { iconId: 'veil', titleKey: 'nyx_symbol_1_title', descriptionKey: 'nyx_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Nyx_legacy', modernEchoes: [
        { echoKey: 'nyx_echo_1_title', explanationKey: 'nyx_echo_1_desc'},
    ], archetypalMirrorKey: 'Nyx_mirror_desc' },
  },
  Gaia: {
    id: 'Gaia', name: 'Gaia', gender: 'female', domain: 'The Earth & Creation', mbtiMapping: ['ISFJ'],
    strengths: ['Creative Force', 'Nurturing', 'Enduring', 'Foundational'],
    shadows: ['Vengeful', 'Possessive of her children', 'Primal Chaos', 'Unforgiving'],
    mythos: { summaryKey: 'Gaia_myth', constellation: [
        { titleKey: 'gaia_myth_1_title', descriptionKey: 'gaia_myth_1_desc'},
        { titleKey: 'gaia_myth_2_title', descriptionKey: 'gaia_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Gaia_domain', symbols: [
        { iconId: 'earth', titleKey: 'gaia_symbol_1_title', descriptionKey: 'gaia_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Gaia_legacy', modernEchoes: [
        { echoKey: 'gaia_echo_1_title', explanationKey: 'gaia_echo_1_desc'},
    ], archetypalMirrorKey: 'Gaia_mirror_desc' },
  },
  Uranus: {
    id: 'Uranus', name: 'Uranus', gender: 'male', domain: 'The Sky & Cosmic Order', mbtiMapping: ['ENTJ'],
    strengths: ['Orderly', 'Vast Vision', 'Authoritative', 'Expansive'],
    shadows: ['Tyrannical', 'Cruel to his children', 'Fear of being overthrown', 'Detached'],
    mythos: { summaryKey: 'Uranus_myth', constellation: [
        { titleKey: 'uranus_myth_1_title', descriptionKey: 'uranus_myth_1_desc'},
        { titleKey: 'uranus_myth_2_title', descriptionKey: 'uranus_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Uranus_domain', symbols: [
        { iconId: 'stars', titleKey: 'uranus_symbol_1_title', descriptionKey: 'uranus_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Uranus_legacy', modernEchoes: [
        { echoKey: 'uranus_echo_1_title', explanationKey: 'uranus_echo_1_desc'},
    ], archetypalMirrorKey: 'Uranus_mirror_desc' },
  },

  // --- TITANS ---
  Iapetus: {
    id: 'Iapetus', name: 'Iapetus', gender: 'male', domain: 'Mortality & Ancestry', mbtiMapping: ['ISTJ'],
    strengths: ['Foundational', 'Enduring', 'Ancestor', 'Father of Rebels'],
    shadows: ['Overthrown', 'Represents the Old Order', 'Associated with Pride', 'Suffers for his Children\'s Actions'],
    mythos: { summaryKey: 'Iapetus_myth', constellation: [
        { titleKey: 'iapetus_myth_1_title', descriptionKey: 'iapetus_myth_1_desc'},
        { titleKey: 'iapetus_myth_2_title', descriptionKey: 'iapetus_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Iapetus_domain', symbols: [
        { iconId: 'spear', titleKey: 'iapetus_symbol_1_title', descriptionKey: 'iapetus_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Iapetus_legacy', modernEchoes: [
        { echoKey: 'iapetus_echo_1_title', explanationKey: 'iapetus_echo_1_desc'},
    ], archetypalMirrorKey: 'Iapetus_mirror_desc' },
  },
  Leto: {
    id: 'Leto', name: 'Leto', gender: 'female', domain: 'Motherhood & Protection', mbtiMapping: ['ISFJ'],
    strengths: ['Devoted Mother', 'Resilient', 'Gentle', 'Grace Under Pressure'],
    shadows: ['A Wanderer', 'Target of Jealousy', 'Sorrowful', 'Persecuted'],
    mythos: { summaryKey: 'Leto_myth', constellation: [
        { titleKey: 'leto_myth_1_title', descriptionKey: 'leto_myth_1_desc'},
        { titleKey: 'leto_myth_2_title', descriptionKey: 'leto_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Leto_domain', symbols: [
        { iconId: 'quail', titleKey: 'leto_symbol_1_title', descriptionKey: 'leto_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Leto_legacy', modernEchoes: [
        { echoKey: 'leto_echo_1_title', explanationKey: 'leto_echo_1_desc'},
    ], archetypalMirrorKey: 'Leto_mirror_desc' },
  },
  Cronus: {
    id: 'Cronus', name: 'Cronus', gender: 'male', domain: 'Time & The Harvest', mbtiMapping: ['ISTJ'],
    strengths: ['Disciplined', 'Ambitious', 'Brings Order (initially)', 'Patient'],
    shadows: ['Paranoid', 'Consuming', 'Tyrannical', 'Resists the Future'],
    mythos: { summaryKey: 'Cronus_myth', constellation: [
        { titleKey: 'cronus_myth_1_title', descriptionKey: 'cronus_myth_1_desc'},
        { titleKey: 'cronus_myth_2_title', descriptionKey: 'cronus_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Cronus_domain', symbols: [
        { iconId: 'sickle', titleKey: 'cronus_symbol_1_title', descriptionKey: 'cronus_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Cronus_legacy', modernEchoes: [
        { echoKey: 'cronus_echo_1_title', explanationKey: 'cronus_echo_1_desc'},
    ], archetypalMirrorKey: 'Cronus_mirror_desc' },
  },
  Rhea: {
    id: 'Rhea', name: 'Rhea', gender: 'female', domain: 'Motherhood & The Flow of Generations', mbtiMapping: ['ESFJ'],
    strengths: ['Protective', 'Resourceful', 'Patient', 'Nurturing'],
    shadows: ['Deceptive (out of necessity)', 'Overwhelmed by her partner', 'Grief-stricken', 'Enabler of conflict'],
    mythos: { summaryKey: 'Rhea_myth', constellation: [
        { titleKey: 'rhea_myth_1_title', descriptionKey: 'rhea_myth_1_desc'},
        { titleKey: 'rhea_myth_2_title', descriptionKey: 'rhea_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Rhea_domain', symbols: [
        { iconId: 'lion', titleKey: 'rhea_symbol_1_title', descriptionKey: 'rhea_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Rhea_legacy', modernEchoes: [
        { echoKey: 'rhea_echo_1_title', explanationKey: 'rhea_echo_1_desc'},
    ], archetypalMirrorKey: 'Rhea_mirror_desc' },
  },
  // --- OLYMPIANS & TITAN PROMETHEUS (EXISTING DATA) ---
  [ArchetypeId.ATHENA]: { 
    id: ArchetypeId.ATHENA, name: 'Athena', gender: 'female', domain: 'Wisdom & Strategy', mbtiMapping: ['INTJ', 'INTP', 'ENTJ'],
    strengths: ['Strategic Thinking', 'Intellectual Curiosity', 'Calm Under Pressure', 'Problem-Solving'],
    shadows: ['Emotional Detachment', 'Arrogance', 'Overly Critical', 'Reluctance to Delegate'],
    mythos: { 
      summaryKey: 'Athena_myth', 
      constellation: [
        { titleKey: 'athena_myth_1_title', descriptionKey: 'athena_myth_1_desc'},
        { titleKey: 'athena_myth_2_title', descriptionKey: 'athena_myth_2_desc'},
        { titleKey: 'athena_myth_3_title', descriptionKey: 'athena_myth_3_desc'},
      ]
    },
    domains: { 
      summaryKey: 'Athena_domain', 
      symbols: [
        { iconId: 'owl', titleKey: 'athena_symbol_1_title', descriptionKey: 'athena_symbol_1_desc' },
        { iconId: 'olive_tree', titleKey: 'athena_symbol_2_title', descriptionKey: 'athena_symbol_2_desc' },
      ], 
      interactives: [] 
    },
    resonance: { 
      summaryKey: 'Athena_legacy', 
      modernEchoes: [
        { echoKey: 'athena_echo_1_title', explanationKey: 'athena_echo_1_desc'},
        { echoKey: 'athena_echo_2_title', explanationKey: 'athena_echo_2_desc'},
      ], 
      archetypalMirrorKey: 'athena_mirror_desc' 
    },
  },
  [ArchetypeId.ARES]: { 
    id: ArchetypeId.ARES, name: 'Ares', gender: 'male', domain: 'Courage & War', mbtiMapping: ['ESTP', 'ISTP'],
    strengths: ['Decisive Action', 'Courageous', 'Passionate', 'Protective'],
    shadows: ['Impulsive', 'Aggressive', 'Lacks Foresight', 'Reckless'],
    mythos: { summaryKey: 'Ares_myth', constellation: [
      { titleKey: 'ares_myth_1_title', descriptionKey: 'ares_myth_1_desc'},
      { titleKey: 'ares_myth_2_title', descriptionKey: 'ares_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Ares_domain', symbols: [
      { iconId: 'spear', titleKey: 'ares_symbol_1_title', descriptionKey: 'ares_symbol_1_desc' },
      { iconId: 'helmet', titleKey: 'ares_symbol_2_title', descriptionKey: 'ares_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Ares_legacy', modernEchoes: [
      { echoKey: 'ares_echo_1_title', explanationKey: 'ares_echo_1_desc'},
      { echoKey: 'ares_echo_2_title', explanationKey: 'ares_echo_2_desc'},
    ], archetypalMirrorKey: 'Ares_mirror_desc' },
  },
  [ArchetypeId.APOLLO]: { 
    id: ArchetypeId.APOLLO, name: 'Apollo', gender: 'male', domain: 'Art & Prophecy', mbtiMapping: ['ENFJ', 'INFJ'],
    strengths: ['Visionary', 'Inspirational', 'Creative', 'Seeks Harmony and Truth'],
    shadows: ['Perfectionistic', 'Can be Vain', 'Emotionally Distant', 'Prone to Sudden Wrath'],
    mythos: { summaryKey: 'Apollo_myth', constellation: [
      { titleKey: 'apollo_myth_1_title', descriptionKey: 'apollo_myth_1_desc'},
      { titleKey: 'apollo_myth_2_title', descriptionKey: 'apollo_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Apollo_domain', symbols: [
      { iconId: 'lyre', titleKey: 'apollo_symbol_1_title', descriptionKey: 'apollo_symbol_1_desc' },
      { iconId: 'sun', titleKey: 'apollo_symbol_2_title', descriptionKey: 'apollo_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Apollo_legacy', modernEchoes: [
      { echoKey: 'apollo_echo_1_title', explanationKey: 'apollo_echo_1_desc'},
      { echoKey: 'apollo_echo_2_title', explanationKey: 'apollo_echo_2_desc'},
    ], archetypalMirrorKey: 'Apollo_mirror_desc' },
  },
  [ArchetypeId.ARTEMIS]: { 
    id: ArchetypeId.ARTEMIS, name: 'Artemis', gender: 'female', domain: 'Independence & The Hunt', mbtiMapping: ['ISTJ', 'ISFJ'],
    strengths: ['Independent', 'Focused', 'Protective', 'Self-Sufficient'],
    shadows: ['Unforgiving', 'Avoids Intimacy', 'Impatient', 'Can be Ruthless'],
    mythos: { summaryKey: 'Artemis_myth', constellation: [
      { titleKey: 'artemis_myth_1_title', descriptionKey: 'artemis_myth_1_desc'},
      { titleKey: 'artemis_myth_2_title', descriptionKey: 'artemis_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Artemis_domain', symbols: [
      { iconId: 'bow_arrow', titleKey: 'artemis_symbol_1_title', descriptionKey: 'artemis_symbol_1_desc' },
      { iconId: 'moon', titleKey: 'artemis_symbol_2_title', descriptionKey: 'artemis_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Artemis_legacy', modernEchoes: [
      { echoKey: 'artemis_echo_1_title', explanationKey: 'artemis_echo_1_desc'},
      { echoKey: 'artemis_echo_2_title', explanationKey: 'artemis_echo_2_desc'},
    ], archetypalMirrorKey: 'Artemis_mirror_desc' },
  },
  [ArchetypeId.ZEUS]: { 
    id: ArchetypeId.ZEUS, name: 'Zeus', gender: 'male', domain: 'Leadership & Order', mbtiMapping: ['ENTJ', 'ESTJ'],
    strengths: ['Natural Leader', 'Authoritative', 'Visionary', 'Charismatic'],
    shadows: ['Domineering', 'Prone to Infidelity', 'Arrogant', 'Impulsive Temper'],
    mythos: { 
      summaryKey: 'Zeus_myth', 
      constellation: [
        { titleKey: 'zeus_myth_1_title', descriptionKey: 'zeus_myth_1_desc'},
        { titleKey: 'zeus_myth_2_title', descriptionKey: 'zeus_myth_2_desc'},
        { titleKey: 'zeus_myth_3_title', descriptionKey: 'zeus_myth_3_desc'},
      ]
    },
    domains: { 
      summaryKey: 'Zeus_domain', 
      symbols: [
        { iconId: 'lightning', titleKey: 'zeus_symbol_1_title', descriptionKey: 'zeus_symbol_1_desc' },
        { iconId: 'eagle', titleKey: 'zeus_symbol_2_title', descriptionKey: 'zeus_symbol_2_desc' },
      ], 
      interactives: [] 
    },
    resonance: { 
      summaryKey: 'Zeus_legacy', 
      modernEchoes: [
        { echoKey: 'zeus_echo_1_title', explanationKey: 'zeus_echo_1_desc'},
        { echoKey: 'zeus_echo_2_title', explanationKey: 'zeus_echo_2_desc'},
      ], 
      archetypalMirrorKey: 'zeus_mirror_desc' 
    },
  },
  [ArchetypeId.HERA]: { 
    id: ArchetypeId.HERA, name: 'Hera', gender: 'female', domain: 'Commitment & Community', mbtiMapping: ['ESFJ', 'ISFJ'],
    strengths: ['Loyal', 'Committed', 'Builds Community', 'Upholds Tradition'],
    shadows: ['Jealous', 'Vindictive', 'Controlling', 'Resistant to Change'],
    mythos: { summaryKey: 'Hera_myth', constellation: [
      { titleKey: 'hera_myth_1_title', descriptionKey: 'hera_myth_1_desc'},
      { titleKey: 'hera_myth_2_title', descriptionKey: 'hera_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Hera_domain', symbols: [
      { iconId: 'peacock', titleKey: 'hera_symbol_1_title', descriptionKey: 'hera_symbol_1_desc' },
      { iconId: 'diadem', titleKey: 'hera_symbol_2_title', descriptionKey: 'hera_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Hera_legacy', modernEchoes: [
      { echoKey: 'hera_echo_1_title', explanationKey: 'hera_echo_1_desc'},
      { echoKey: 'hera_echo_2_title', explanationKey: 'hera_echo_2_desc'},
    ], archetypalMirrorKey: 'Hera_mirror_desc' },
  },
  [ArchetypeId.POSEIDON]: { 
    id: ArchetypeId.POSEIDON, name: 'Poseidon', gender: 'male', domain: 'Emotion & Instinct', mbtiMapping: ['ESFP', 'ISFP'],
    strengths: ['Emotionally Aware', 'Instinctive', 'Passionate', 'Adaptable'],
    shadows: ['Moody', 'Unpredictable', 'Vengeful', 'Can be Overwhelming'],
    mythos: { 
      summaryKey: 'Poseidon_myth', 
      constellation: [
        { titleKey: 'poseidon_myth_1_title', descriptionKey: 'poseidon_myth_1_desc'},
        { titleKey: 'poseidon_myth_2_title', descriptionKey: 'poseidon_myth_2_desc'},
        { titleKey: 'poseidon_myth_3_title', descriptionKey: 'poseidon_myth_3_desc'},
      ]
    },
    domains: { 
      summaryKey: 'Poseidon_domain', 
      symbols: [
        { iconId: 'trident', titleKey: 'poseidon_symbol_1_title', descriptionKey: 'poseidon_symbol_1_desc' },
        { iconId: 'horse', titleKey: 'poseidon_symbol_2_title', descriptionKey: 'poseidon_symbol_2_desc' },
        { iconId: 'earthquake', titleKey: 'poseidon_symbol_3_title', descriptionKey: 'poseidon_symbol_3_desc' },
      ], 
      interactives: [
        { type: 'interactive', titleKey: 'poseidon_interactive_1_title', descriptionKey: 'poseidon_interactive_1_desc', interactiveId: 'poseidon_sea_mood' }
      ]
    },
    resonance: { 
      summaryKey: 'Poseidon_legacy', 
      modernEchoes: [
        { echoKey: 'poseidon_echo_1_title', explanationKey: 'poseidon_echo_1_desc'},
        { echoKey: 'poseidon_echo_2_title', explanationKey: 'poseidon_echo_2_desc'},
      ], 
      archetypalMirrorKey: 'poseidon_mirror_desc' 
    },
  },
  [ArchetypeId.HADES]: { 
    id: ArchetypeId.HADES, name: 'Hades', gender: 'male', domain: 'Depth & The Underworld', mbtiMapping: ['INFJ', 'INFP'],
    strengths: ['Introspective', 'Finds Value in Depth', 'Authoritative in his Domain', 'Principled'],
    shadows: ['Socially Withdrawn', 'Uncompromising', 'Morbid', 'Possessive'],
    mythos: { summaryKey: 'Hades_myth', constellation: [
      { titleKey: 'hades_myth_1_title', descriptionKey: 'hades_myth_1_desc'},
      { titleKey: 'hades_myth_2_title', descriptionKey: 'hades_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Hades_domain', symbols: [
      { iconId: 'bident', titleKey: 'hades_symbol_1_title', descriptionKey: 'hades_symbol_1_desc' },
      { iconId: 'invisibility_helm', titleKey: 'hades_symbol_2_title', descriptionKey: 'hades_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Hades_legacy', modernEchoes: [
      { echoKey: 'hades_echo_1_title', explanationKey: 'hades_echo_1_desc'},
      { echoKey: 'hades_echo_2_title', explanationKey: 'hades_echo_2_desc'},
    ], archetypalMirrorKey: 'Hades_mirror_desc' },
  },
  [ArchetypeId.APHRODITE]: {
    id: ArchetypeId.APHRODITE, name: 'Aphrodite', gender: 'female', domain: 'Love & Beauty', mbtiMapping: ['ESFP', 'ENFP'],
    strengths: ['Charismatic', 'Appreciates Aesthetics', 'Passionate', 'Fosters Connection'],
    shadows: ['Vain', 'Can be Fickle', 'Avoids Conflict', 'Prone to Jealousy'],
    mythos: { summaryKey: 'Aphrodite_myth', constellation: [
      { titleKey: 'aphrodite_myth_1_title', descriptionKey: 'aphrodite_myth_1_desc'},
      { titleKey: 'aphrodite_myth_2_title', descriptionKey: 'aphrodite_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Aphrodite_domain', symbols: [
      { iconId: 'scallop', titleKey: 'aphrodite_symbol_1_title', descriptionKey: 'aphrodite_symbol_1_desc' },
      { iconId: 'dove', titleKey: 'aphrodite_symbol_2_title', descriptionKey: 'aphrodite_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Aphrodite_legacy', modernEchoes: [
      { echoKey: 'aphrodite_echo_1_title', explanationKey: 'aphrodite_echo_1_desc'},
      { echoKey: 'aphrodite_echo_2_title', explanationKey: 'aphrodite_echo_2_desc'},
    ], archetypalMirrorKey: 'Aphrodite_mirror_desc' },
  },
  [ArchetypeId.HEPHAESTUS]: {
    id: ArchetypeId.HEPHAESTUS, name: 'Hephaestus', gender: 'male', domain: 'Craft & Invention', mbtiMapping: ['ISTP', 'INTP'],
    strengths: ['Innovative', 'Skilled Craftsman', 'Patient & Methodical', 'Resilient'],
    shadows: ['Withdrawn', 'Cynical', 'Holds Grudges', 'Struggles with Social Graces'],
    mythos: { summaryKey: 'Hephaestus_myth', constellation: [
      { titleKey: 'hephaestus_myth_1_title', descriptionKey: 'hephaestus_myth_1_desc'},
      { titleKey: 'hephaestus_myth_2_title', descriptionKey: 'hephaestus_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Hephaestus_domain', symbols: [
      { iconId: 'hammer_anvil', titleKey: 'hephaestus_symbol_1_title', descriptionKey: 'hephaestus_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Hephaestus_legacy', modernEchoes: [
      { echoKey: 'hephaestus_echo_1_title', explanationKey: 'hephaestus_echo_1_desc'},
      { echoKey: 'hephaestus_echo_2_title', explanationKey: 'hephaestus_echo_2_desc'},
    ], archetypalMirrorKey: 'Hephaestus_mirror_desc' },
  },
  [ArchetypeId.HERMES]: {
    id: ArchetypeId.HERMES, name: 'Hermes', gender: 'male', domain: 'Communication & Cunning', mbtiMapping: ['ENTP', 'ESTP'],
    strengths: ['Adaptable', 'Clever & Witty', 'Excellent Communicator', 'Resourceful'],
    shadows: ['Prone to Trickery', 'Restless', 'Can be Unreliable', 'Avoids Deep Commitment'],
    mythos: { summaryKey: 'Hermes_myth', constellation: [
      { titleKey: 'hermes_myth_1_title', descriptionKey: 'hermes_myth_1_desc'},
      { titleKey: 'hermes_myth_2_title', descriptionKey: 'hermes_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Hermes_domain', symbols: [
      { iconId: 'caduceus', titleKey: 'hermes_symbol_1_title', descriptionKey: 'hermes_symbol_1_desc' },
      { iconId: 'winged_sandals', titleKey: 'hermes_symbol_2_title', descriptionKey: 'hermes_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Hermes_legacy', modernEchoes: [
      { echoKey: 'hermes_echo_1_title', explanationKey: 'hermes_echo_1_desc'},
      { echoKey: 'hermes_echo_2_title', explanationKey: 'hermes_echo_2_desc'},
    ], archetypalMirrorKey: 'Hermes_mirror_desc' },
  },
  [ArchetypeId.DIONYSUS]: {
    id: ArchetypeId.DIONYSUS, name: 'Dionysus', gender: 'male', domain: 'Ecstasy & Liberation', mbtiMapping: ['ESFP', 'ENFP'],
    strengths: ['Charismatic', 'Liberating', 'Celebrates Life', 'Inspires Creativity'],
    shadows: ['Prone to Excess', 'Chaotic', 'Avoids Responsibility', 'Can be Destructive'],
    mythos: { summaryKey: 'Dionysus_myth', constellation: [
      { titleKey: 'dionysus_myth_1_title', descriptionKey: 'dionysus_myth_1_desc'},
      { titleKey: 'dionysus_myth_2_title', descriptionKey: 'dionysus_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Dionysus_domain', symbols: [
      { iconId: 'grapes', titleKey: 'dionysus_symbol_1_title', descriptionKey: 'dionysus_symbol_1_desc' },
      { iconId: 'thyrsus', titleKey: 'dionysus_symbol_2_title', descriptionKey: 'dionysus_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Dionysus_legacy', modernEchoes: [
      { echoKey: 'dionysus_echo_1_title', explanationKey: 'dionysus_echo_1_desc'},
      { echoKey: 'dionysus_echo_2_title', explanationKey: 'dionysus_echo_2_desc'},
    ], archetypalMirrorKey: 'Dionysus_mirror_desc' },
  },
  [ArchetypeId.DEMETER]: {
    id: ArchetypeId.DEMETER, name: 'Demeter', gender: 'female', domain: 'Nurturing & Harvest', mbtiMapping: ['ISFJ', 'ESFJ'],
    strengths: ['Nurturing', 'Generous', 'Patient', 'Deeply Caring'],
    shadows: ['Overprotective', 'Prone to Grief', 'Resistant to Change', 'Can be Overbearing'],
    mythos: { summaryKey: 'Demeter_myth', constellation: [
      { titleKey: 'demeter_myth_1_title', descriptionKey: 'demeter_myth_1_desc'},
      { titleKey: 'demeter_myth_2_title', descriptionKey: 'demeter_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Demeter_domain', symbols: [
      { iconId: 'wheat', titleKey: 'demeter_symbol_1_title', descriptionKey: 'demeter_symbol_1_desc' },
      { iconId: 'torch', titleKey: 'demeter_symbol_2_title', descriptionKey: 'demeter_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Demeter_legacy', modernEchoes: [
      { echoKey: 'demeter_echo_1_title', explanationKey: 'demeter_echo_1_desc'},
      { echoKey: 'demeter_echo_2_title', explanationKey: 'demeter_echo_2_desc'},
    ], archetypalMirrorKey: 'Demeter_mirror_desc' },
  },
  [ArchetypeId.PERSEPHONE]: {
    id: ArchetypeId.PERSEPHONE, name: 'Persephone', gender: 'female', domain: 'Duality & Transformation', mbtiMapping: ['INFP', 'INFJ'],
    strengths: ['Empathetic', 'Adaptable', 'Resilient', 'Introspective & Wise'],
    shadows: ['Passive at Times', 'Torn Between Worlds', 'Can be Melancholy', 'Secretive'],
    mythos: { summaryKey: 'Persephone_myth', constellation: [
      { titleKey: 'persephone_myth_1_title', descriptionKey: 'persephone_myth_1_desc'},
      { titleKey: 'persephone_myth_2_title', descriptionKey: 'persephone_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Persephone_domain', symbols: [
      { iconId: 'pomegranate', titleKey: 'persephone_symbol_1_title', descriptionKey: 'persephone_symbol_1_desc' },
      { iconId: 'asphodel', titleKey: 'persephone_symbol_2_title', descriptionKey: 'persephone_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Persephone_legacy', modernEchoes: [
      { echoKey: 'persephone_echo_1_title', explanationKey: 'persephone_echo_1_desc'},
      { echoKey: 'persephone_echo_2_title', explanationKey: 'persephone_echo_2_desc'},
    ], archetypalMirrorKey: 'Persephone_mirror_desc' },
  },
  [ArchetypeId.HESTIA]: {
    id: ArchetypeId.HESTIA, name: 'Hestia', gender: 'female', domain: 'Hearth & Sanctuary', mbtiMapping: ['ISFJ', 'INFJ'],
    strengths: ['Peaceful', 'Stable', 'Creates Sanctuary', 'Selfless & Humble'],
    shadows: ['Passive', 'Avoids Conflict', 'Withdrawn', 'Resists the Spotlight'],
    mythos: { summaryKey: 'Hestia_myth', constellation: [
      { titleKey: 'hestia_myth_1_title', descriptionKey: 'hestia_myth_1_desc'},
      { titleKey: 'hestia_myth_2_title', descriptionKey: 'hestia_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Hestia_domain', symbols: [
      { iconId: 'hearth', titleKey: 'hestia_symbol_1_title', descriptionKey: 'hestia_symbol_1_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Hestia_legacy', modernEchoes: [
      { echoKey: 'hestia_echo_1_title', explanationKey: 'hestia_echo_1_desc'},
      { echoKey: 'hestia_echo_2_title', explanationKey: 'hestia_echo_2_desc'},
    ], archetypalMirrorKey: 'Hestia_mirror_desc' },
  },
  [ArchetypeId.PROMETHEUS]: {
    id: ArchetypeId.PROMETHEUS, name: 'Prometheus', gender: 'male', domain: 'Foresight & Rebellion', mbtiMapping: ['INTJ', 'INTP'],
    strengths: ['Visionary', 'Humanitarian', 'Innovative', 'Courageous Nonconformist'],
    shadows: ['Arrogant', 'Stubborn', 'Can be Deceptive', 'Suffers for his Ideals'],
    mythos: { summaryKey: 'Prometheus_myth', constellation: [
      { titleKey: 'prometheus_myth_1_title', descriptionKey: 'prometheus_myth_1_desc'},
      { titleKey: 'prometheus_myth_2_title', descriptionKey: 'prometheus_myth_2_desc'},
    ]},
    domains: { summaryKey: 'Prometheus_domain', symbols: [
      { iconId: 'fire', titleKey: 'prometheus_symbol_1_title', descriptionKey: 'prometheus_symbol_1_desc' },
      { iconId: 'chains', titleKey: 'prometheus_symbol_2_title', descriptionKey: 'prometheus_symbol_2_desc' },
    ], interactives: [] },
    resonance: { summaryKey: 'Prometheus_legacy', modernEchoes: [
      { echoKey: 'prometheus_echo_1_title', explanationKey: 'prometheus_echo_1_desc'},
      { echoKey: 'prometheus_echo_2_title', explanationKey: 'prometheus_echo_2_desc'},
    ], archetypalMirrorKey: 'Prometheus_mirror_desc' },
  },
};

export const DEITY_PROFILES = allDeityProfiles;

// For backward compatibility and use in assessment-specific logic
export const ARCHETYPES = Object.fromEntries(
  Object.entries(allDeityProfiles).filter(([key]) => Object.values(ArchetypeId).includes(key as ArchetypeId))
) as Record<ArchetypeId, Archetype>;
