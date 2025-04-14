#[cfg_attr(mobile, tauri::mobile_entry_point)]
/// Initializes and runs the Tauri application, enabling logging in debug mode.
///
/// In debug builds, attaches a logging plugin to the application that logs messages at the `Info` level. Panics if the application fails to start.
///
/// # Examples
///
/// ```
/// // Starts the Tauri application. Typically called from main().
/// run();
/// ```
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
