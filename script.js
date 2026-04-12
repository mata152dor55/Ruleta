document.addEventListener('DOMContentLoaded', () => {
    const girarBtn = document.getElementById('girar-btn');
    const ruleta = document.querySelector('.ruleta');
    const resultadoTexto = document.getElementById('resultado');

    // Por defecto asumo una ruleta europea estándar (37 números).
    // Si tu imagen tiene diferentes números o un orden diferente, 
    // debes reemplazarlos en este array, siempre en el orden en que aparecen 
    // en la imagen, leyendo en sentido horario empezando por el que está ARRIBA.
    const segmentos = [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
        5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
    ];

    let rotacionActual = 0;

    if (girarBtn && ruleta) {
        girarBtn.addEventListener('click', () => {
            // Deshabilitar botón durante el giro
            girarBtn.disabled = true;
            resultadoTexto.textContent = "Girando...";
            resultadoTexto.style.color = 'inherit';

            // Generar entre 3 y 6 vueltas completas
            const vueltasExtra = (Math.floor(Math.random() * 4) + 3) * 360;
            // Generar los grados extra para caer en un segmento aleatorio
            const gradosAleatorios = Math.floor(Math.random() * 360);
            
            // Total a rotar
            const rotacionTotal = rotacionActual + vueltasExtra + gradosAleatorios;

            // Aplicamos la rotación
            ruleta.style.transform = `rotate(${rotacionTotal}deg)`;
            
            // Guardamos la rotación para el siguiente giro
            rotacionActual = rotacionTotal;

            // Esperar los 3s de la animación de CSS para calcular el resultado
            setTimeout(() => {
                // Sacamos los grados reales actuales de 0 a 360
                const gradosNormalizados = rotacionTotal % 360;
                
                // Calculamos a qué segmento le corresponde ese ángulo.
                // Como giramos en sentido horario, los grados positivos 
                // hacen que los segmentos retrocedan su posición hacia el puntero de arriba.
                const anguloPorSegmento = 360 / segmentos.length;
                
                // Ajuste para el cálculo del segmento (para que el puntero apunte correctamente al medio del segmento)
                // Se resta el grado del total (360) para invertir el sentido horario.
                // Sumamos la mitad del ángulo de un segmento para compensar el centro.
                const indice = Math.floor(((360 - gradosNormalizados + (anguloPorSegmento / 2)) % 360) / anguloPorSegmento);
                
                const resultadoFinal = segmentos[indice];

                resultadoTexto.textContent = `Resultado: ${resultadoFinal}`;
                resultadoTexto.style.color = 'var(--accent-color)';
                
                // Rehabilitar botón
                girarBtn.disabled = false;
            }, 3000); 
        });
    }
});
