export default (audio, settings) => {
  audio.setSoundMuted(settings.getSoundMuted());
  audio.setMusicMuted(settings.getMusicMuted());
  audio.setMusicVolume(settings.getMusicVolume());
  audio.setSoundVolume(settings.getSoundVolume());
  audio.setMusic('intro');
};
