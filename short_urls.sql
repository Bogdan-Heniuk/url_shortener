IF NOT EXISTS(
  SELECT
    *
  FROM
    sys.databases
  WHERE
    name = 'short_urls'
) do $ $ begin CREATE DATABASE short_urls
end $ $