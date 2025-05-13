
resource "bunnynet_pullzone" "db" {
  name                          = "${var.service_name}-db"
  cors_enabled                  = false
  add_canonical_header          = true
  cache_expiration_time         = 0
  cache_expiration_time_browser = 0
  strip_cookies                 = false

  origin {
    type                = "OriginUrl"
    url                 = "http://${var.web_server}"
    forward_host_header = true
    follow_redirects    = true
  }

  routing {
    tier  = "Standard"
    zones = ["AF", "ASIA", "EU", "SA", "US"]
  }
}

resource "bunnynet_pullzone_hostname" "bunnynet_db" {
  pullzone    = bunnynet_pullzone.db.id
  name        = "${var.service_name}-db.b-cdn.net"
  tls_enabled = true
  force_ssl   = true
}

resource "bunnynet_pullzone_hostname" "db" {
  pullzone    = bunnynet_pullzone.db.id
  name        = "db.${data.bunnynet_dns_zone.dns.domain}"
  tls_enabled = true
  force_ssl   = true
}

resource "bunnynet_pullzone_edgerule" "redirect_db_domain" {
  enabled     = true
  pullzone    = bunnynet_pullzone.db.id
  description = "Redirect pullzone domain to www domain."

  actions = [
    {
      type       = "Redirect"
      parameter1 = "https://${bunnynet_pullzone_hostname.db.name}"
      parameter2 = "301"
      parameter3 = null
    }
  ]

  match_type = "MatchAny"
  triggers = [
    {
      type       = "Url"
      match_type = "MatchAny"
      patterns = [
        "https://${bunnynet_pullzone_hostname.bunnynet_db.name}/*"
      ]
      parameter1 = null
      parameter2 = null
    }
  ]
}
