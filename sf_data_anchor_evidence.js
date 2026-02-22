// sf_data_anchor_evidence.js
window.rawNodesData = [
  // ---- ANCHORS (домены) ----
  { id: "pv-k.ru",        label: "pv-k.ru",        group: "osint_domain", size: 20, font: { size: 14, bold: true }, info: "ANCHOR domain" },
  { id: "www.pv-k.ru",    label: "www.pv-k.ru",    group: "osint_domain", size: 20, font: { size: 14, bold: true }, info: "ANCHOR domain" },
  { id: "emeds.ru",       label: "emeds.ru",       group: "osint_domain", size: 20, font: { size: 14, bold: true }, info: "ANCHOR domain" },
  { id: "eltonmed.ru",    label: "eltonmed.ru",    group: "osint_domain", size: 20, font: { size: 14, bold: true }, info: "ANCHOR domain" },
  { id: "portanapa.ru",   label: "portanapa.ru",   group: "osint_domain", size: 20, font: { size: 14, bold: true }, info: "ANCHOR domain" },

  // ---- PIVOTS: NS ----
  { id: "ns8-l2.nic.ru",        label: "ns8-l2.nic.ru",        group: "osint_domain", info: "NS pivot (nic.ru)" },
  { id: "ns8-cloud.nic.ru",     label: "ns8-cloud.nic.ru",     group: "osint_domain", info: "NS pivot (nic.ru)" },
  { id: "ns4-cloud.nic.ru",     label: "ns4-cloud.nic.ru",     group: "osint_domain", info: "NS pivot (nic.ru)" },
  { id: "ns3-l2.nic.ru",        label: "ns3-l2.nic.ru",        group: "osint_domain", info: "NS pivot (nic.ru)" },
  { id: "ns4-l2.nic.ru",        label: "ns4-l2.nic.ru",        group: "osint_domain", info: "NS pivot (nic.ru)" },

  { id: "ns1.timeweb.ru",       label: "ns1.timeweb.ru",       group: "osint_domain", info: "NS pivot (Timeweb)" },
  { id: "ns2.timeweb.ru",       label: "ns2.timeweb.ru",       group: "osint_domain", info: "NS pivot (Timeweb)" },
  { id: "ns3.timeweb.org",      label: "ns3.timeweb.org",      group: "osint_domain", info: "NS pivot (Timeweb)" },
  { id: "ns4.timeweb.org",      label: "ns4.timeweb.org",      group: "osint_domain", info: "NS pivot (Timeweb)" },

  { id: "dns1.yandex.net",      label: "dns1.yandex.net",      group: "osint_domain", info: "NS pivot (Yandex DNS)" },
  { id: "dns2.yandex.net",      label: "dns2.yandex.net",      group: "osint_domain", info: "NS pivot (Yandex DNS)" },

  { id: "ns1.hosting.reg.ru",   label: "ns1.hosting.reg.ru",   group: "osint_domain", info: "NS pivot (REG.RU hosting)" },
  { id: "ns2.hosting.reg.ru",   label: "ns2.hosting.reg.ru",   group: "osint_domain", info: "NS pivot (REG.RU hosting)" },

  // ---- PIVOTS: MX ----
  { id: "mx.yandex.net",        label: "mx.yandex.net",        group: "osint_domain", info: "MX pivot (Yandex Mail)" },
  { id: "emx.mail.ru",          label: "emx.mail.ru",          group: "osint_domain", info: "MX pivot (Mail.ru)" },

  // ---- PIVOTS: IP ----
  { id: "92.53.96.174",         label: "92.53.96.174",         group: "osint_ip", info: "A pivot" },
  { id: "92.53.96.140",         label: "92.53.96.140",         group: "osint_ip", info: "A pivot" },
  { id: "5.101.152.206",        label: "5.101.152.206",        group: "osint_ip", info: "A pivot" },
  { id: "31.31.196.139",        label: "31.31.196.139",        group: "osint_ip", info: "A pivot" }
];

window.rawEdgesData = [
  // pv-k.ru -> NS (nic.ru)
  { from: "pv-k.ru", to: "ns8-l2.nic.ru",    label: "NS", title: "NS (dns.google / 8.8.8.8): pv-k.ru nameserver = ns8-l2.nic.ru" },
  { from: "pv-k.ru", to: "ns8-cloud.nic.ru", label: "NS", title: "NS (dns.google / 8.8.8.8): pv-k.ru nameserver = ns8-cloud.nic.ru" },
  { from: "pv-k.ru", to: "ns4-cloud.nic.ru", label: "NS", title: "NS (dns.google / 8.8.8.8): pv-k.ru nameserver = ns4-cloud.nic.ru" },
  { from: "pv-k.ru", to: "ns3-l2.nic.ru",    label: "NS", title: "NS (dns.google / 8.8.8.8): pv-k.ru nameserver = ns3-l2.nic.ru" },
  { from: "pv-k.ru", to: "ns4-l2.nic.ru",    label: "NS", title: "NS (dns.google / 8.8.8.8): pv-k.ru nameserver = ns4-l2.nic.ru" },

  // pv-k.ru -> MX (Yandex)
  { from: "pv-k.ru", to: "mx.yandex.net",    label: "MX", title: "MX (dns.google / 8.8.8.8): pv-k.ru MX 10 mx.yandex.net" },

  // pv-k.ru / www.pv-k.ru -> A
  { from: "pv-k.ru",     to: "92.53.96.174", label: "A",  title: "A (dns.google / 8.8.8.8): pv-k.ru -> 92.53.96.174" },
  { from: "www.pv-k.ru", to: "92.53.96.174", label: "A",  title: "A (dns.google / 8.8.8.8): www.pv-k.ru -> 92.53.96.174" },

  // emeds.ru -> NS (Timeweb)
  { from: "emeds.ru", to: "ns1.timeweb.ru",  label: "NS", title: "NS (dns.google / 8.8.8.8): emeds.ru nameserver = ns1.timeweb.ru" },
  { from: "emeds.ru", to: "ns2.timeweb.ru",  label: "NS", title: "NS (dns.google / 8.8.8.8): emeds.ru nameserver = ns2.timeweb.ru" },
  { from: "emeds.ru", to: "ns3.timeweb.org", label: "NS", title: "NS (dns.google / 8.8.8.8): emeds.ru nameserver = ns3.timeweb.org" },
  { from: "emeds.ru", to: "ns4.timeweb.org", label: "NS", title: "NS (dns.google / 8.8.8.8): emeds.ru nameserver = ns4.timeweb.org" },

  // emeds.ru -> MX (Mail.ru)
  { from: "emeds.ru", to: "emx.mail.ru",     label: "MX", title: "MX (dns.google / 8.8.8.8): emeds.ru MX 10 emx.mail.ru" },

  // emeds.ru -> A
  { from: "emeds.ru", to: "92.53.96.140",    label: "A",  title: "A (dns.google / 8.8.8.8): emeds.ru -> 92.53.96.140" },

  // eltonmed.ru -> NS (Yandex DNS)
  { from: "eltonmed.ru", to: "dns1.yandex.net", label: "NS", title: "NS (dns.google / 8.8.8.8): eltonmed.ru nameserver = dns1.yandex.net" },
  { from: "eltonmed.ru", to: "dns2.yandex.net", label: "NS", title: "NS (dns.google / 8.8.8.8): eltonmed.ru nameserver = dns2.yandex.net" },

  // eltonmed.ru -> MX (Yandex)
  { from: "eltonmed.ru", to: "mx.yandex.net",   label: "MX", title: "MX (dns.google / 8.8.8.8): eltonmed.ru MX 10 mx.yandex.net" },

  // eltonmed.ru -> A
  { from: "eltonmed.ru", to: "5.101.152.206",   label: "A",  title: "A (dns.google / 8.8.8.8): eltonmed.ru -> 5.101.152.206" },

  // portanapa.ru -> NS (REG.RU hosting)
  { from: "portanapa.ru", to: "ns1.hosting.reg.ru", label: "NS", title: "NS (dns.google / 8.8.8.8): portanapa.ru nameserver = ns1.hosting.reg.ru" },
  { from: "portanapa.ru", to: "ns2.hosting.reg.ru", label: "NS", title: "NS (dns.google / 8.8.8.8): portanapa.ru nameserver = ns2.hosting.reg.ru" },

  // portanapa.ru -> MX (Mail.ru)
  { from: "portanapa.ru", to: "emx.mail.ru",        label: "MX", title: "MX (dns.google / 8.8.8.8): portanapa.ru MX 10 emx.mail.ru" },

  // portanapa.ru -> A
  { from: "portanapa.ru", to: "31.31.196.139",      label: "A",  title: "A (dns.google / 8.8.8.8): portanapa.ru -> 31.31.196.139" }
];
