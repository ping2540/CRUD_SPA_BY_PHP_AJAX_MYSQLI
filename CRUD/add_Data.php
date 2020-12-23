<?php
echo '
<div class="container-liquid">
<div class="row">
<div class="d-flex justify-content-md-between">
<div class="d-flex  col-md-4">
</div>
<div class="d-flex  col-md-4">
<a href="pdf.php" target="_blank"><i class="fa fa-file-pdf-o" style="font-size:60px;color:red"></i></a>
<span class="input-group-text"><i class="fa fa-search fa-2x" aria-hidden="true"></i></span>
<input type="text" class="form-control" id="search" placeholder="Search"/>
</div>


<button id="add" class="btn btn-success mx-2"><i class="fas fa-user-plus fa-2x mx-2"></i></button>
</div></div></div>

    <br>

    <div id="modalAdd" class="modal fade">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class=" text-center modal-title">Add Into Database</h5>
                    <button class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span></button>
                </div>

                <div class="modal-body">
                    <div class="container">
                       
                        <div class="row">
                            <div class="col-md-6 offset-md-3 form-group">
                                <label class="my-2">First Name</label>
                                <input type="text" id="firstname" class="form-control" placeholder="firstname" />
                                <span class="text"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 offset-md-3 form-group">
                                <label class="my-2">Last Name</label>
                                <input type="text" id="lastname" class="form-control" placeholder="lastname" />
                                <span class="text"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 offset-md-3 form-group">
                                <label class="my-2">Phone</label>
                                <input type="text" id="phone" class="form-control" placeholder="0xx-xxx-xxxx" />
                                <span class="text"></span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 offset-md-3 form-group">
                                <label class="my-2">Email</label>
                                <input type="email" id="email" class="form-control" placeholder="youremail@gmail.com" />
                                <span class="text"></span>
                            </div>
                        </div>
                        <div class="container">
                            <div class="d-flex justify-content-end mx-2">
                                <button type="submit" id="submit" class="btn btn-success"><i class="fas fa-save fa-3x"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>';
