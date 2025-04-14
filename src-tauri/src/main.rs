// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/// Initializes and runs the Tauri application.
  ///
  /// Launches the application with default settings and a generated context. Panics with an error message if the application fails to start.
  ///
  /// # Examples
  ///
  /// ```
  /// // Starts the Tauri application.
  /// main();
  /// ```
  fn main() {
  tauri::Builder::default()
     .run(tauri::generate_context!())
     .expect("error while running tauri application");
  }