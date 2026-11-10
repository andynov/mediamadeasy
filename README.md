# ¿Cuántas horas te cuesta tu remesa?

Herramienta interactiva que calcula cuántas horas de trabajo por año se llevan las comisiones y el margen del tipo de cambio al enviar dinero de España a Colombia.

## Cómo funciona

- **Datos que ingresa el lector:** monto por envío (€), envíos por año y salario por hora (precargado: 9,36 €/h, salario mínimo de España 2026).
- **Fórmula:** costo por envío = comisión fija + margen cambiario % × monto. Horas por año = costo por envío × envíos por año ÷ salario por hora.
- **Resultado:** la mediana de los servicios relevados, el promedio publicado por el Banco Mundial y los extremos (más barato y más caro).

## Fuentes

- Banco Mundial, *Remittance Prices Worldwide*, corredor España → Colombia, tercer trimestre de 2025 (relevado del 2 de agosto al 9 de septiembre de 2025): https://remittanceprices.worldbank.org/corridor/ES/CO
- BOE, Real Decreto 126/2026 (salario mínimo interprofesional 2026): https://www.boe.es/eli/es/rd/2026/02/18/126/con

## Archivos

- `index.html`: estructura de la página
- `styles.css`: estilos (modo claro y oscuro)
- `app.js`: datos y cálculo

No necesita servidor ni dependencias: se abre directamente en el navegador o se publica con GitHub Pages.

Construida con Claude (Anthropic).
