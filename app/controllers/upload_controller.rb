class UploadController < CapBaseController
  def index; end

  def create
    users = SmarterCSV.process(params[:file].tempfile)
    @records = []
    users.each do |user|
      user[:roles] = user[:roles].split(",")
      user_detail = Users::UserDetails.new(user)
      Users::UserRepository.new.verify_user(user_detail.to_h, session[:token])
      Users::UserRepository.new.add_user(user_detail.to_h, session[:token])
      @records << user_detail
    end
  rescue => error
    puts error
  end
end
