class UploadController < CapBaseController
  def index; end

  def create
    users = SmarterCSV.process(params[:file].tempfile)
    @records = users
  end
end
