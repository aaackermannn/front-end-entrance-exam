# Используем официальный образ Gotenberg
FROM gotenberg/gotenberg:7.10

# Отключаем блокировку JavaScript (для корректного рендеринга)
CMD ["gotenberg", "--chromium-disable-javascript=false"]

# Опционально: добавляем healthcheck
HEALTHCHECK --interval=10s --timeout=3s CMD curl -f http://localhost:3000/health || exit 1