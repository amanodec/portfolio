import { portfolio } from './content/portfolio';
import { projectRegistry } from './content/projects';
import { DeviceTier } from './core/DeviceTier';
import { FrameLoop } from './core/FrameLoop';
import { MotionPreferences } from './core/MotionPreferences';
import { PerformanceGovernor } from './core/PerformanceGovernor';
import { SceneDirector } from './core/SceneDirector';
import { EffectsControl } from './preferences/EffectsControl';
import { Navigation } from './navigation/Navigation';
import { CapabilityScene } from './scenes/CapabilityScene';
import { ContactScene } from './scenes/ContactScene';
import { ExperienceScene } from './scenes/ExperienceScene';
import { HeroScene } from './scenes/HeroScene';
import { IdentityScene } from './scenes/IdentityScene';
import { PlaygroundScene } from './scenes/PlaygroundScene';
import { QuietScene } from './scenes/QuietScene';
import { ProjectWorldEngine } from './scenes/projects/ProjectWorldEngine';
import { DecisionArcWorld } from './scenes/projects/DecisionArcWorld';
import { TradingLeaguesWorld } from './scenes/projects/TradingLeaguesWorld';
import { VinayakBikersWorld } from './scenes/projects/VinayakBikersWorld';
import { ZesttWorld } from './scenes/projects/ZesttWorld';
import { Renderer } from './three/Renderer';

const hero = document.querySelector<HTMLElement>('#hero');
const canvas = document.querySelector<HTMLCanvasElement>('#signal-canvas');
const identity = document.querySelector<HTMLElement>('#identity');
const capability = document.querySelector<HTMLElement>('#skills[data-phase="capability"]');
const experience = document.querySelector<HTMLElement>('#experience[data-phase="experience"]');
const playground = document.querySelector<HTMLElement>('#playground[data-phase="playground"]');
const quiet = document.querySelector<HTMLElement>('#philosophy[data-phase="quiet"]');
const contact = document.querySelector<HTMLElement>('#contact[data-phase="contact"]');
const projectWorlds = Array.from(document.querySelectorAll<HTMLElement>('[data-phase="project-world"][data-project]'));
const projectWorld = projectWorlds[0];

if (hero && canvas && identity && capability && experience && playground && quiet && contact && projectWorld && projectWorlds.length === projectRegistry.length) {
  document.documentElement.classList.add('phase1-runtime', 'phase2-runtime', 'phase3-runtime', 'phase4-runtime', 'phase5-runtime', 'phase6-runtime', 'phase7-runtime', 'phase8-runtime');
  document.documentElement.dataset.heroSubject = 'zestt';
  hero.dataset.product = portfolio.hero.title.toLowerCase();

  const preferences = new MotionPreferences(portfolio.effects.storageKey);
  const effects = new EffectsControl(preferences);
  const tier = DeviceTier.detect();
  const frameLoop = new FrameLoop();
  const navigation = new Navigation();
  const sceneDirector = new SceneDirector();
  const setWebglState = (available: boolean) => {
    document.documentElement.dataset.webgl = String(available);
    hero.dataset.webgl = String(available);
    capability.dataset.webgl = String(available);
    experience.dataset.webgl = String(available);
    playground.dataset.webgl = String(available);
    quiet.dataset.webgl = String(available);
    contact.dataset.webgl = String(available);
    projectWorlds.forEach((world) => { world.dataset.webgl = String(available); });
  };
  const renderer = new Renderer(canvas, tier, () => {
    setWebglState(false);
  }, () => {
    setWebglState(true);
  });
  setWebglState(renderer.available);
  const governor = new PerformanceGovernor(frameLoop, {
    onDowngrade: () => renderer.setQuality('reduced')
  });
  const heroScene = new HeroScene(hero, frameLoop, preferences, tier, renderer);
  const identityScene = new IdentityScene(identity, frameLoop, preferences, tier);
  const capabilityScene = new CapabilityScene(capability, frameLoop, preferences, tier);
  const experienceScene = new ExperienceScene(experience, frameLoop, preferences, tier);
  const playgroundScene = new PlaygroundScene(playground, frameLoop, preferences, tier);
  const quietScene = new QuietScene(quiet, frameLoop, preferences, tier);
  const contactScene = new ContactScene(contact, preferences, tier);
  const projectEngine = new ProjectWorldEngine({ sections: projectWorlds, frameLoop, preferences, renderer, tier });
  const worldOptions = { frameLoop, preferences, renderer, tier };
  projectEngine.register(new ZesttWorld({ section: projectWorlds[0], project: projectRegistry[0], ...worldOptions }));
  projectEngine.register(new TradingLeaguesWorld({ section: projectWorlds[1], project: projectRegistry[1], ...worldOptions }));
  projectEngine.register(new DecisionArcWorld({ section: projectWorlds[2], project: projectRegistry[2], ...worldOptions }));
  projectEngine.register(new VinayakBikersWorld({ section: projectWorlds[3], project: projectRegistry[3], ...worldOptions }));

  sceneDirector.register({
    id: 'hero',
    enter: () => heroScene.enter(),
    update: () => heroScene.enter(),
    leave: () => heroScene.leave(),
    destroy: () => heroScene.destroy()
  });
  sceneDirector.register({
    id: 'identity',
    enter: () => identityScene.enter(),
    update: (progress) => identityScene.update(progress),
    leave: () => identityScene.leave(),
    destroy: () => identityScene.destroy()
  });
  sceneDirector.register({
    id: 'project-worlds',
    enter: () => undefined,
    leave: () => projectEngine.exit(),
    destroy: () => projectEngine.destroy()
  });
  sceneDirector.register({
    id: 'capability',
    enter: () => capabilityScene.enter(),
    update: (progress) => capabilityScene.update(progress),
    leave: () => capabilityScene.leave(),
    destroy: () => capabilityScene.destroy()
  });
  sceneDirector.register({
    id: 'experience',
    enter: () => experienceScene.enter(),
    update: (progress) => experienceScene.update(progress),
    leave: () => experienceScene.leave(),
    destroy: () => experienceScene.destroy()
  });
  sceneDirector.register({
    id: 'playground',
    enter: () => playgroundScene.enter(),
    update: (progress) => playgroundScene.update(progress),
    leave: () => playgroundScene.leave(),
    destroy: () => playgroundScene.destroy()
  });
  sceneDirector.register({
    id: 'quiet',
    enter: () => quietScene.enter(),
    update: (progress) => quietScene.update(progress),
    leave: () => quietScene.leave(),
    destroy: () => quietScene.destroy()
  });
  sceneDirector.register({
    id: 'contact',
    enter: () => contactScene.enter(),
    update: (progress) => contactScene.update(progress),
    leave: () => contactScene.leave(),
    destroy: () => contactScene.destroy()
  });
  sceneDirector.enter('hero');

  const syncScene = () => {
    const scrollY = window.scrollY;
    const identityStart = identity.offsetTop;
    const projectStart = projectWorld.offsetTop;
    const projectEnd = projectWorlds.at(-1)!.offsetTop + projectWorlds.at(-1)!.offsetHeight;
    const capabilityStart = capability.offsetTop;
    const capabilityEnd = capability.offsetTop + capability.offsetHeight;
    const experienceStart = experience.offsetTop;
    const experienceEnd = experience.offsetTop + experience.offsetHeight;
    const playgroundStart = playground.offsetTop;
    const playgroundEnd = playground.offsetTop + playground.offsetHeight;
    const quietStart = quiet.offsetTop;
    const quietEnd = quiet.offsetTop + quiet.offsetHeight;
    const contactStart = contact.offsetTop;
    const contactEnd = contact.offsetTop + contact.offsetHeight;
    const receiveThreshold = window.innerHeight * 0.42;
    if (scrollY < identityStart - receiveThreshold) {
      sceneDirector.enter('hero');
    } else if (scrollY < projectStart - receiveThreshold) {
      sceneDirector.enter('identity');
      sceneDirector.update('identity', Math.min(Math.max((scrollY - identityStart) / Math.max(identity.offsetHeight - window.innerHeight, 1), 0), 1));
    } else if (scrollY < projectEnd - receiveThreshold) {
      const index = projectWorlds.reduce((found, world, worldIndex) => {
        if (scrollY >= world.offsetTop - receiveThreshold) return worldIndex;
        return found;
      }, 0);
      const currentWorld = projectWorlds[index];
      const project = projectRegistry[index];
      const progress = Math.min(Math.max((scrollY - currentWorld.offsetTop) / Math.max(currentWorld.offsetHeight - window.innerHeight, 1), 0), 1);
      sceneDirector.enter('project-worlds');
      projectEngine.enter(project.slug);
      projectEngine.update(project.slug, progress);
    } else if (scrollY < capabilityStart - receiveThreshold) {
      sceneDirector.exit();
    } else if (scrollY < capabilityEnd - receiveThreshold) {
      const progress = Math.min(Math.max((scrollY - capabilityStart) / Math.max(capability.offsetHeight - window.innerHeight, 1), 0), 1);
      sceneDirector.enter('capability');
      sceneDirector.update('capability', progress);
    } else if (scrollY < experienceStart - receiveThreshold) {
      sceneDirector.exit();
    } else if (scrollY < experienceEnd - receiveThreshold) {
      const progress = Math.min(Math.max((scrollY - experienceStart) / Math.max(experience.offsetHeight - window.innerHeight, 1), 0), 1);
      sceneDirector.enter('experience');
      sceneDirector.update('experience', progress);
    } else if (scrollY < playgroundStart - receiveThreshold) {
      sceneDirector.exit();
    } else if (scrollY < playgroundEnd - receiveThreshold) {
      const progress = Math.min(Math.max((scrollY - playgroundStart) / Math.max(playground.offsetHeight - window.innerHeight, 1), 0), 1);
      sceneDirector.enter('playground');
      sceneDirector.update('playground', progress);
    } else if (scrollY < quietStart - receiveThreshold) {
      sceneDirector.exit();
    } else if (scrollY < quietEnd - receiveThreshold) {
      const progress = Math.min(Math.max((scrollY - quietStart) / Math.max(quiet.offsetHeight - window.innerHeight, 1), 0), 1);
      sceneDirector.enter('quiet');
      sceneDirector.update('quiet', progress);
    } else if (scrollY < contactStart - receiveThreshold) {
      sceneDirector.exit();
    } else if (scrollY < contactEnd - receiveThreshold) {
      const progress = Math.min(Math.max((scrollY - contactStart) / Math.max(contact.offsetHeight - window.innerHeight, 1), 0), 1);
      sceneDirector.enter('contact');
      sceneDirector.update('contact', progress);
    } else {
      sceneDirector.exit();
    }
  };
  window.addEventListener('scroll', syncScene, { passive: true });
  window.addEventListener('resize', syncScene, { passive: true });
  window.addEventListener('hashchange', syncScene, { passive: true });
  syncScene();

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    sceneDirector.destroy();
    renderer.destroy();
    governor.destroy();
    effects.destroy();
    navigation.destroy();
    preferences.destroy();
    frameLoop.destroy();
    window.removeEventListener('scroll', syncScene);
    window.removeEventListener('resize', syncScene);
    window.removeEventListener('hashchange', syncScene);
    window.removeEventListener('pagehide', cleanup);
  };
  window.addEventListener('pagehide', cleanup, { once: true });
    document.body.dataset.phase1 = 'ready';
    document.body.dataset.phase6 = 'ready';
    document.body.dataset.phase7 = 'ready';
}
