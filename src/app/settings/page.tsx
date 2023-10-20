import SettingComponents from "@/components/settings"
import styles from './settings.module.css'

export const metadata = {
  title: 'Settings - Aniflex',
  description: 'Aniflex - Watch Anime for free',
}

export default function SettingPage() {

  return (
    <main>
      <h3 className={`my-3 text-lg font-medium ${styles.margin}`}>Settings</h3>
      <div className={`${styles.margin} rounded-lg border p-3 shadow-sm`}>
        <SettingComponents id="ShowR18+" className="my-4" settingLabel="Enable R18+" settingDescription="Shows R18+ Contents like Hentai See Navigation Menu to Access" />
        <SettingComponents id="ClosedCaption" className="my-4" settingLabel="Show Closed Caption" settingDescription="Shows Captions in episodes that are in Japanese" />
        <SettingComponents id="SkipIntroOutro" className="my-4" settingLabel="Auto skip intro & outro" settingDescription="Skips intro and outro" />
        <SettingComponents id="AutoplayNext" className="my-4" settingLabel="Autoplay" settingDescription="Plays the next episode after the current episode is ended" />
      </div>
    </main>
  )
}