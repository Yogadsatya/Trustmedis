document.getElementById('pdf-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pdfFile', document.getElementById('pdf-file').files[0]);
    formData.append('password', document.getElementById('password').value);

    try {
        const response = await fetch('/lock-pdf', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById('result').innerHTML = `
                <p>PDF successfully locked!</p>
                <a href="${result.downloadLink}" download>Download Locked PDF</a>
            `;
        } else {
            document.getElementById('result').innerHTML = `<p>Error: ${result.message}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p>Failed to lock PDF. Please try again.</p>`;
    }
});
