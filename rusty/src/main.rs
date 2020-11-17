use env_logger::Env;

use actix_files::NamedFile;
use actix_files as fs;
use actix_web::{web, App, HttpServer, Result, middleware::Logger};


async fn index() -> Result<NamedFile> {
    Ok(NamedFile::open("index.html")?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let connection_uri = String::from("0.0.0.0:8080");

    std::env::set_var("RUST_LOG", "actix_web=info");
    std::env::set_var("RUST_LOG", "info");
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();


    HttpServer::new(|| {
        App::new()
            .wrap(Logger::new("%a %{User-Agent}i %r %D %s "))
            .service(fs::Files::new("/dist", "dist/"))
            .service(fs::Files::new("/resources", "resources/"))
            .service(fs::Files::new("/data", "data/"))
            .service(fs::Files::new("/html", "html/"))
            .route("/", web::get().to(index))
    })
    .bind(connection_uri)?
        .run()
        .await
}
