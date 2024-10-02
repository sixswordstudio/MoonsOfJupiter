const fs = require('fs');
const path = require('path');

// Define your planets and their metadata, or you can leave this array empty if you want to populate them later manually.
const planetsData = {
  '01mercury': {
    name: 'Mercury',
    position: 1,
    speed_of_rotation: '58.6',
    orbit_span: '88',
    daytime_temperature: '430',
    nighttime_temperature: '-180',
    discovery_info: 'Mercury has been known since ancient times.',
    history_info: 'The Romans named Mercury after the messenger of the gods.',
    geography_info: 'Mercury is a rocky planet with many craters.',
    climate_info: 'Mercury has extreme temperature variations.',
    physical_characteristics: 'Mercury is the smallest planet in the Solar System and has a thin atmosphere.',
    orbit_rotation_info: 'Mercury’s orbit is highly elliptical, and it has the shortest year in the Solar System.',
    moons_info: 'Mercury has no moons or rings.',
    human_exploration_info: 'The MESSENGER spacecraft orbited Mercury from 2011 to 2015.',
    cultural_significance: 'In Roman mythology, Mercury was the messenger of the gods.',
    ad_hoc_content: 'Additional interesting facts or content about Mercury.'
  },
  '02venus': {
    name: 'Venus',
    position: 2,
    speed_of_rotation: '243',
    orbit_span: '225',
    daytime_temperature: '460',
    nighttime_temperature: '460',
    discovery_info: 'Venus has been observed since ancient times, known for its brightness.',
    history_info: 'The first successful mission to Venus was the Mariner 2 flyby in 1962.',
    geography_info: 'Venus has a surface covered with volcanoes and vast plains.',
    climate_info: 'Venus has a runaway greenhouse effect, making it the hottest planet in the Solar System.',
    physical_characteristics: 'Venus is similar in size to Earth, with a thick atmosphere of carbon dioxide.',
    orbit_rotation_info: 'Venus has a slow retrograde rotation, meaning it spins in the opposite direction of most planets.',
    moons_info: 'Venus has no moons.',
    human_exploration_info: 'The Soviet Venera missions landed on Venus and sent back data from the surface.',
    cultural_significance: 'Venus is often called Earth’s “sister planet” and is associated with the Roman goddess of love.',
    ad_hoc_content: 'Additional interesting facts or content about Venus.'
  },
  '03earth': {
    name: 'Earth',
    position: 3,
    speed_of_rotation: '24',
    orbit_span: '365.25',
    daytime_temperature: '15',
    nighttime_temperature: '15',
    discovery_info: 'Earth was “discovered” by humans around the time they realized it wasn’t flat.',
    history_info: 'Earth is often said to be discovered by *literally everyone ever*, but modern civilization really got to know it once maps became a thing.',
    geography_info: 'Earth has vast oceans, diverse landforms, and is the only known planet to harbor life (including your favorite pizza shop).',
    climate_info: 'Earth has a dynamic climate system with varied weather patterns and seasonal changes, perfect for everything from sunbathing to building snowmen.',
    physical_characteristics: 'Earth is a geologically active planet with mountains, rivers, forests, deserts, and lots of things that sting or bite.',
    orbit_rotation_info: 'Earth’s axis is tilted at about 23.5°, giving us seasons. It completes one orbit around the Sun every 365.25 days, leading to leap years.',
    moons_info: 'Earth has one moon, which is responsible for tides, occasional werewolf sightings, and romantic moonlit walks.',
    human_exploration_info: 'Humans have explored almost all of Earth, and there are no plans to leave (yet).',
    cultural_significance: 'Earth has been central to most human myths, religions, and sci-fi movies. Also, it’s home.',
    ad_hoc_content: 'The best pizza in the Solar System can be found here. Fun fact!'
  },
  '04mars': {
    name: 'Mars',
    position: 4,
    speed_of_rotation: '24.6',
    orbit_span: '687',
    daytime_temperature: '-28',
    nighttime_temperature: '-60',
    discovery_info: 'Mars has been known since ancient times. It was named after the Roman god of war due to its red color.',
    history_info: 'Mars has fascinated humans for centuries, and we’ve been sending rovers there since the 20th century, hoping to find little green men.',
    geography_info: 'Mars has the tallest volcano in the Solar System, Olympus Mons, and the longest canyon, Valles Marineris.',
    climate_info: 'Mars is cold and dry, with dust storms that can engulf the entire planet.',
    physical_characteristics: 'Mars is a rocky planet with a thin atmosphere composed mostly of carbon dioxide.',
    orbit_rotation_info: 'Mars has seasons similar to Earth’s, due to its axial tilt of 25 degrees.',
    moons_info: 'Mars has two moons, Phobos and Deimos, which are thought to be captured asteroids.',
    human_exploration_info: 'NASA’s Perseverance rover is the latest in a line of robots sent to explore the Martian surface, looking for signs of past life.',
    cultural_significance: 'Mars has inspired countless works of fiction, including H.G. Wells’ *War of the Worlds* and *The Martian*.',
    ad_hoc_content: 'Mars: still waiting for Matt Damon to get rescued... again.'
  },
  '05jupiter': {
    name: 'Jupiter',
    position: 5,
    speed_of_rotation: '9.9',
    orbit_span: '4331',
    daytime_temperature: '-108',
    nighttime_temperature: '-108',
    discovery_info: 'Jupiter has been known since prehistoric times, visible to the naked eye.',
    history_info: 'Named after the king of the Roman gods, Jupiter has been studied extensively, including by the Galileo spacecraft.',
    geography_info: 'Jupiter is a gas giant with no solid surface, but it has a Great Red Spot, a storm larger than Earth.',
    climate_info: 'Jupiter’s atmosphere is mostly hydrogen and helium, with powerful winds and enormous storms.',
    physical_characteristics: 'Jupiter is the largest planet in the Solar System, with a mass more than 300 times that of Earth.',
    orbit_rotation_info: 'Jupiter takes nearly 12 Earth years to orbit the Sun, but it has the shortest day of any planet at 9.9 hours.',
    moons_info: 'Jupiter has 79 moons, including the four Galilean moons: Io, Europa, Ganymede, and Callisto.',
    human_exploration_info: 'The Juno spacecraft is currently studying Jupiter, providing new insights into its atmosphere and magnetic field.',
    cultural_significance: 'Jupiter has played a significant role in mythology and astronomy, and continues to fascinate scientists and sci-fi writers alike.',
    ad_hoc_content: 'Fun fact: You could fit more than 1,300 Earths inside Jupiter!'
  },
  '06saturn': {
    name: 'Saturn',
    position: 6,
    speed_of_rotation: '10.7',
    orbit_span: '10747',
    daytime_temperature: '-139',
    nighttime_temperature: '-139',
    discovery_info: 'Saturn has been known since ancient times, famous for its stunning ring system.',
    history_info: 'Named after the Roman god of agriculture, Saturn has been studied by numerous missions, including Cassini, which orbited the planet for 13 years.',
    geography_info: 'Saturn is a gas giant with no solid surface. Its rings are made of ice and rock, stretching out over 120,000 kilometers.',
    climate_info: 'Saturn has a thick atmosphere mostly composed of hydrogen and helium, with winds that can reach speeds of up to 1,800 kilometers per hour.',
    physical_characteristics: 'Saturn is the second-largest planet in the Solar System and is known for its iconic rings.',
    orbit_rotation_info: 'Saturn takes 29.5 Earth years to complete one orbit, and it rotates quickly with a day lasting only 10.7 hours.',
    moons_info: 'Saturn has 83 moons, including Titan, the second-largest moon in the Solar System, which has a thick atmosphere.',
    human_exploration_info: 'The Cassini-Huygens mission provided a wealth of information about Saturn and its moons, especially Titan and Enceladus.',
    cultural_significance: 'Saturn’s rings have made it a favorite in astronomy and pop culture, inspiring everything from logos to sci-fi landscapes.',
    ad_hoc_content: 'Saturn’s rings could stretch from Earth to the Moon if you laid them flat!'
  },
  '07uranus': {
    name: 'Uranus',
    position: 7,
    speed_of_rotation: '17.2',
    orbit_span: '30589',
    daytime_temperature: '-195',
    nighttime_temperature: '-195',
    discovery_info: 'Uranus was discovered by Sir William Herschel in 1781, making it the first planet discovered with a telescope.',
    history_info: 'Uranus was originally named "Georgium Sidus" after King George III, but was later renamed after the Greek god of the sky.',
    geography_info: 'Uranus is an ice giant, with an atmosphere rich in water, ammonia, and methane ices, giving it a blue color.',
    climate_info: 'Uranus has the coldest atmosphere of any planet, with extreme temperatures reaching -224°C.',
    physical_characteristics: 'Uranus is tilted on its side, meaning it essentially rolls around the Sun. It has faint rings and is mostly composed of ice and gas.',
    orbit_rotation_info: 'Uranus takes 84 Earth years to orbit the Sun, and its tilt causes extreme seasonal changes.',
    moons_info: 'Uranus has 27 known moons, named after characters from Shakespeare and Alexander Pope.',
    human_exploration_info: 'Voyager 2 is the only spacecraft to have flown by Uranus, providing much of the information we have today.',
    cultural_significance: 'Uranus, despite being a bit of an underdog in the Solar System, remains a key player in modern astronomy.',
    ad_hoc_content: 'Uranus has a bad reputation due to its name. Let’s just say it rolls with it!'
  },
  '08neptune': {
    name: 'Neptune',
    position: 8,
    speed_of_rotation: '16.1',
    orbit_span: '59800',
    daytime_temperature: '-201',
    nighttime_temperature: '-201',
    discovery_info: 'Neptune was discovered in 1846 by Johann Galle, based on predictions by Urbain Le Verrier.',
    history_info: 'Neptune was the first planet discovered by mathematical prediction rather than direct observation.',
    geography_info: 'Neptune is an ice giant, similar in composition to Uranus, with a vibrant blue atmosphere.',
    climate_info: 'Neptune has some of the strongest winds in the Solar System, reaching speeds of up to 2,100 kilometers per hour.',
    physical_characteristics: 'Neptune has a thick atmosphere composed of hydrogen, helium, and methane, which gives it its blue color.',
    orbit_rotation_info: 'Neptune takes 165 Earth years to orbit the Sun, and a day on Neptune lasts about 16 hours.',
    moons_info: 'Neptune has 14 moons, with Triton being the largest. Triton is unique because it orbits Neptune in the opposite direction of the planet’s rotation.',
    human_exploration_info: 'Voyager 2 is the only spacecraft to have visited Neptune, providing stunning images of its clouds and rings.',
    cultural_significance: 'Neptune is associated with the Roman god of the sea, fitting for its deep blue color.',
    ad_hoc_content: 'Neptune’s winds are faster than any hurricane on Earth!'
  },
  '09pluto': {
    name: 'Pluto',
    position: 9,
    speed_of_rotation: '153.3',
    orbit_span: '90560',
    daytime_temperature: '-229',
    nighttime_temperature: '-229',
    discovery_info: 'Pluto was discovered in 1930 by Clyde Tombaugh at the Lowell Observatory.',
    history_info: 'Pluto was considered the ninth planet until 2006, when it was reclassified as a dwarf planet by the IAU. It’s still bitter about it.',
    geography_info: 'Pluto is a small, rocky, icy world with mountains and vast plains. It has a heart-shaped glacier called Tombaugh Regio.',
    climate_info: 'Pluto’s atmosphere is thin and composed mainly of nitrogen, with traces of methane and carbon monoxide.',
    physical_characteristics: 'Pluto is the largest known dwarf planet in the Solar System, with a rocky core surrounded by ice.',
    orbit_rotation_info: 'Pluto has a highly elliptical orbit that sometimes brings it closer to the Sun than Neptune. It takes 248 Earth years to complete one orbit.',
    moons_info: 'Pluto has five moons, with Charon being the largest. Charon is so large relative to Pluto that they are sometimes considered a double dwarf planet system.',
    human_exploration_info: 'NASA’s New Horizons mission flew by Pluto in 2015, providing the first close-up images of its surface.',
    cultural_significance: 'Pluto remains a beloved underdog in the Solar System, with many advocating for its return to full planet status.',
    ad_hoc_content: 'Pluto may be small, but it has a heart of ice—literally!'
  },
};

// Define the template
const template = `
---
title: "{{Planet Name}}"
sidebar_position: {{position}}
label: "{{Planet Name}}"
---

### General Information

- **Speed of Rotation:** {{speed_of_rotation}} hours
- **Orbit around the Sun:** {{orbit_span}} days
- **Daytime Temperature:** {{daytime_temperature}} °C
- **Nighttime Temperature:** {{nighttime_temperature}} °C

### Discovery

{{discovery_info}}

### History and Observation

{{history_info}}

### Physical Characteristics

{{physical_characteristics}}

### Orbit and Rotation

{{orbit_rotation_info}}

### Moons

{{moons_info}}

### Atmosphere and Climate

{{climate_info}}

### Human Exploration

{{human_exploration_info}}

### Cultural Significance

{{cultural_significance}}`;

function formatFile(planet, filePath) {
  const content = template
    .replace('{{Planet Name}}', planet.name)
    .replace('{{position}}', planet.position)
    .replace('{{speed_of_rotation}}', planet.speed_of_rotation)
    .replace('{{orbit_span}}', planet.orbit_span)
    .replace('{{daytime_temperature}}', planet.daytime_temperature)
    .replace('{{nighttime_temperature}}', planet.nighttime_temperature)
    .replace('{{discovery_info}}', planet.discovery_info || 'Unknown')
    .replace('{{history_info}}', planet.history_info || 'Unknown')
    .replace('{{physical_characteristics}}', planet.physical_characteristics || 'Unknown')
    .replace('{{orbit_rotation_info}}', planet.orbit_rotation_info || 'Unknown')
    .replace('{{moons_info}}', planet.moons_info || 'Unknown')
    .replace('{{climate_info}}', planet.climate_info || 'Unknown')
    .replace('{{human_exploration_info}}', planet.human_exploration_info || 'Unknown')
    .replace('{{cultural_significance}}', planet.cultural_significance || 'Unknown')
    .replace('{{ad_hoc_content}}', planet.ad_hoc_content || 'None');

  // Write the updated content to the file
  fs.writeFileSync(filePath, content.trim());
  console.log(`Formatted file for ${planet.name}`);
}

// Loop through the files in the 'docs/planets' folder
const planetsFolder = path.join(__dirname, 'docs', 'planets');
fs.readdir(planetsFolder, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const planetName = path.basename(file, '.md').toLowerCase();
    const planetData = planetsData[planetName];

    if (planetData) {
      const filePath = path.join(planetsFolder, file);
      formatFile(planetData, filePath);
    } else {
      console.log(`No data found for planet: ${planetName}`);
    }
  });
});