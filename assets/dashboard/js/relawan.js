$(document).ready(function() {
   const form = $('#wizardForm');
   const steps = form.find('.step');
   const prevBtn = $('#prevBtn');
   const nextBtn = $('#nextBtn');
   let currentStep = 0;

   function showStep(stepIndex) {
       steps.hide();
       $(steps[stepIndex]).show();
       currentStep = stepIndex;

       prevBtn.prop('disabled', currentStep === 0);

       if (currentStep === steps.length - 1) {
           nextBtn.text('Submit');
       } else {
           nextBtn.text('Selanjutnya');
       }
   }

   prevBtn.click(function() {
       showStep(currentStep - 1);
   });

   nextBtn.click(function() {
       if (currentStep === 0) { // Step 1
           const fileInput = $('#file');

           if (fileInput[0].files.length === 0) {
               $('#alert-data-1').html(
                   '<div class="alert alert-danger" role="alert">Harap unggah foto terlebih dahulu</div>'
               );
           } else {
               const uploadedFile = fileInput[0].files[0];
               const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.webp|\.heic|\.heif)$/i;

               if (!allowedExtensions.exec(uploadedFile.name)) {
                   $('#alert-data-1').html(
                       '<div class="alert alert-danger" role="alert">Hanya file gambar yang diizinkan</div>'
                   );
               } else {
                   $('#alert-data-1').html(''); // Menghapus pesan error jika valid
                   showStep(currentStep + 1);
               }
           }
       } else if (currentStep === 1) { // Step 2
           if (validateStep2()) {
               $('#alert-data-2').html(''); // Menghapus pesan error jika valid
               showStep(currentStep + 1);
           } else {
               $('#alert-data-2').html(
                   '<div class="alert alert-danger" role="alert">Isi data terlebih dahulu</div>'
               );
           }
       } else if (currentStep === 2) { // Step 3
           if (validateStep3()) {
               $('#alert-data-3').html(''); // Menghapus pesan error jika valid
               showStep(currentStep + 1);
            } else {
               $('#alert-data-3').html(
                   '<div class="alert alert-danger" role="alert">Silahkan Isi Alamt Terlebih Dahulu</div>'
               );
            }
       }else if (currentStep === 3) { // Step 4
         if (validateStep4()) {
            form.submit();
        } else {
            $('#alert-data-4').html(
                '<div class="alert alert-danger" role="alert">Silahkan klik checkbox jika sudah benar</div>'
            );
        }
       } else if (currentStep === steps.length - 1) {
           form.submit();
       } else {
           showStep(currentStep + 1);
       }
   });

   showStep(currentStep); // Show the initial step

   function validateStep2() {
       const namaInput = $('#nama');
       const datepickerInput = $('#datepicker');
       const isValid = namaInput.val().trim() !== '' && datepickerInput.val().trim() !== '';
       return isValid;
   }

   function validateStep3() {
       const alamat = $('#alamat');
       const isValid = alamat.val().trim() !== '';
       return isValid;
   }

   function validateStep4() {
      const checkBox = $('#check');
      return checkBox.prop('checked');
   }

   form.submit(function(event) {
      event.preventDefault();

       nextBtn.prop('disabled', true);
       nextBtn.html(
           "<span class='spinner-border spinner-border-sm text-wrap' role='status' aria-hidden='true'></span> Loading..."
       );
       prevBtn.prop('disabled', true);

       var formData = new FormData(this);

       $.ajax({
           url: '../function/submitData.php',
           method: 'POST',
           data: formData,
           processData: false,
           contentType: false,
           success: function(data) {
               console.log(data);
               // Handle the response here
               if (data.status === 'success') {
                   $('#alert-data-4').html(
                       '<div class="alert alert-success" role="alert">Data Berhasil Di Simpan</div>'
                   );
                   window.location.href = 'index.php';
               } else {
                   $('#alert-data-4').html(
                       '<div class="alert alert-danger" role="alert">'+ data.message +'</div>'
                   );
                   nextBtn.prop('disabled', false);
                   nextBtn.text('submit');
                   prevBtn.prop('disabled', false);
               }
           },
           error: function(jqXHR, textStatus, errorThrown) {
               console.log(errorThrown);
               nextBtn.prop('disabled', false);
               nextBtn.text('submit');
               prevBtn.prop('disabled', false);
               $('#alert-data-4').html(
                   '<div class="alert alert-danger" role="alert">Data Gagal Di Simpan</div>'
               );
           }

       });
   });

});


$(document).ready(function() {
   const fileInput = $('#file');
   const previewImage = $('#preview-image');
   const previeInfo = $('#preview-info');
   let previousFile = null;

   fileInput.on('change', function() {
       const file = fileInput[0].files[0];

       $('#retake').text('Ambil Ulang');

       if (file && file !== previousFile) {
           previousFile = file;

           const reader = new FileReader();
           
           reader.onload = function(e) {
               previewImage.attr('src', e.target.result);
               previeInfo.attr('src', e.target.result);
               previewImage.removeClass('d-none');
           }

           reader.readAsDataURL(file);
       }
   });
});