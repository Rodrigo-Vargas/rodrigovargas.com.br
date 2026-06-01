import Head from "next/head";
import Link from "next/link";

export default function VartosHealthPrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Vartos Health</title>
        <meta
          name="description"
          content="Privacy policy for the Vartos Health app. All data is stored locally on your device — nothing is collected or shared."
        />
      </Head>

      <div className="container mt-10 mb-20">
        <div className="post">
          <p className="text-sm text-gray-400 mb-2">
            <Link href="/vartos-health" className="text-blue-500 hover:underline">
              ← Vartos Health
            </Link>
          </p>

          <h1 className="title">Privacy Policy</h1>
          <p className="subtitle">Vartos Health · Effective date: June 1, 2026</p>

          <h2>Overview</h2>
          <p>
            Vartos Health is a personal health and fitness tracking application.
            This policy explains what information the app collects, how it is
            used, and your rights regarding that information.
          </p>
          <p>
            <strong>Short version:</strong> All data you enter into Vartos
            Health stays on your device. We do not collect, transmit, or share
            any personal information.
          </p>

          <h2>Information We Collect</h2>
          <p>
            Vartos Health does <strong>not</strong> collect any personal
            information. All data entered into the app is stored exclusively on
            your device using a local SQLite database.
          </p>
          <p>The app stores the following data <strong>locally on your device only</strong>:</p>
          <ul>
            <li>Habit definitions and completion logs — to track daily habits and streaks</li>
            <li>Exercise and training plan records — to log workouts and training schedules</li>
            <li>Meal records and ingredient data — to track daily nutrition and diet plans</li>
            <li>App preferences and settings — to remember your configuration</li>
          </ul>
          <p>
            This data never leaves your device. It is not uploaded to any
            server, cloud service, or third party.
          </p>

          <h2>Information We Do Not Collect</h2>
          <ul>
            <li>We do <strong>not</strong> collect your name, email address, or any contact information</li>
            <li>We do <strong>not</strong> collect device identifiers or advertising IDs</li>
            <li>We do <strong>not</strong> use analytics, crash reporting, or telemetry services</li>
            <li>We do <strong>not</strong> use cookies or similar tracking technologies</li>
            <li>We do <strong>not</strong> display advertisements</li>
            <li>We do <strong>not</strong> access your camera, microphone, location, or contacts</li>
            <li>We do <strong>not</strong> use any third-party SDKs that collect data</li>
          </ul>

          <h2>Data Storage and Security</h2>
          <p>
            All app data is stored in SQLite database files in your device&apos;s
            private app storage directory. This storage is only accessible to
            the Vartos Health app, protected by Android&apos;s application
            sandboxing, and automatically removed when you uninstall the app.
          </p>
          <p>
            We do not implement cloud backups for app data. If you use your
            device&apos;s built-in backup features (e.g., Google Backup), your app
            data may be included in those backups, which are governed by your
            device manufacturer&apos;s or cloud provider&apos;s privacy policy.
          </p>

          <h2>Data Sharing</h2>
          <p>
            We do not share, sell, rent, or trade any data with third parties.
            There is nothing to share — all data remains on your device.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            Vartos Health is not directed at children under the age of 13. We
            do not knowingly collect any information from children. Since no
            data is collected, there is no privacy risk for any user.
          </p>

          <h2>Your Rights and Choices</h2>
          <p>
            Since all data is stored locally on your device, you have full
            control:
          </p>
          <ul>
            <li><strong>Access:</strong> All your data is visible within the app at all times</li>
            <li><strong>Edit:</strong> You can modify any entry directly in the app</li>
            <li>
              <strong>Delete:</strong> You can delete individual records within
              the app, or uninstall the app to remove all data permanently
            </li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            users of significant changes by updating the effective date at the
            top of this page. Continued use of the app after changes constitutes
            acceptance of the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please
            contact us at:{" "}
            <a href="mailto:rodrigovargas123@gmail.com" className="text-blue-500 hover:underline">
              rodrigovargas123@gmail.com
            </a>
          </p>

          <p className="text-gray-400 text-sm mt-10">
            Vartos Health version 1.0.0
          </p>
        </div>
      </div>
    </>
  );
}
