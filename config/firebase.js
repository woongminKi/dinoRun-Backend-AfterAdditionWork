const admin = require("firebase-admin");

const serviceAccount = {
  type: "service_account",
  project_id: "dino-run-b2fa1",
  private_key_id: "3384a38d1c9a08277875ddfa838ad2ea9ca56f54",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC65RqGhpHsd4PT\nXwdYMRrOLN/YvBi8ngfhCd4KPTrahr59D48CZHT+2hAFWc8ORmmJVLavOMAvu11X\n8IGjJY6M8wC4QrtsRJXzHx5ejtFJjTuOw2K30qh5IVsVxkN0PsHGfFiKW0sTCYtV\nxvBRL9HaxEa5ArUXuBx8HWgFowIWPWRuSp1SSWgkpNx/3luyDntQ9XlsKopfTHrd\nL15LTlUCWklQIBqlcl0vK2vSpsbd5ncgcdqcPW+UtuG8y6StFe9yYTefQVLb7buZ\nMinDOelZ5MMhdFeKMpT7kdDveRM4MVRZ0EmQ5WIS/b4vG5oPVZnyCXIqvtS2noY3\ngtnqHlDVAgMBAAECggEAGc7tXMpUeE0AvT2QLBOL2hDEUI+Y8uL3v5G3Qb6209pr\nj6WIYBIzPcYrFDIUr6n1hOtX1taFY5ICD9S8ciULjFc6MDe23fqSomIXtYMPT5Lb\nOJmulifW7/M1OsqIIhNQevJM374/nb9hqFSyduOdnRIhmgbPrxjThighZzXdYeiX\n0U7oaXt+9qBrEFP8Rkf4CR8YRvOps6OPWEuA7GlcxgA7hdmQxIri1hjBrwZMSQ8N\ntxnCU1O41hJtxfckHTjHFiZ+Qk3eXUh9fAtska0/iIYkzsaLRCVsrF/iH4662qKl\nVdXqs6abDMgUvMwwomPD3IfwFkH0Gjj3tVCssbbo+QKBgQDsHT71EKI7yVXfVZzw\n1uR8H0By3EVlC51TaNuaEmNReYugTDT4bgSlSWVXmGDEmq3s+5uAlWFEy28NhorN\n7ifUmiDDzv6BpwPWMAucAkT4h/cmnYnY1/ZFELGyMe6l5eg45n/123atEg/xc49n\nws/FHGrKcC6M2M/4oHDkKpy6WwKBgQDKoqmCHTi6IQ3hXabzpVrPz3YwMx1OToAO\nZV4VzidYag8OOZO1XSxy58PvddjW41h7fJlv4/PBDd6pQrr7K2o4hSfUtAbUSSSn\nyTBEZuUtwd7ATQ6Wm5YSpyPTZhveYBqaj1bf2y/yLZdBFOjEwQ4cyfiXX4iwhkF1\nQUrRMJwojwKBgEMKSsXqYyX2lJtFA7qeSWG0veffAxUdpx33t+KXNfv8Ntjcym1/\nT3Je1Jd6fH9WK+wNxKlNwMB3wqBkgyTVahnDaWova7QEZ+J44dL6Efs/H72nHWyk\nZRhXFR0zcD9KeBUv3UVBewDJEB3OYflkJvogh3HTSGRVazd81pDySG3hAoGAVPW6\niJlj7XZqcXFozIMp/jOH5FGqGekD/AU4W4AiMwnU4iv16Hb2af8OwdnxXrfXo37s\nfmNfEjSUhPc7mo/ra2M4/g+1RVCdk9Pg7u0Nbg/5KzujwDXfyFZXyQzo5mX5AZDT\n5evqwGmpH1p69fPTzPJJzn35u7muvFDx45+z+bUCgYABSO+0dsJGVtVztU61PY/r\nyyZjCHRizTAeyvZo0tWXeAsUPwqx11ld1IdN1HQmKHQIZpmwg1UnNpAPOqHR6mA3\nS3H/Kef/Y6gJfSCvQPcqp/2bQeCzv+MCrRgC7XxbUS7uzGm+0DiCKCARIeRr/xux\n18aU1BQtDoys/2kYybMt5A==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-9kb7v@dino-run-b2fa1.iam.gserviceaccount.com",
  client_id: "113570678187790241236",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9kb7v%40dino-run-b2fa1.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
