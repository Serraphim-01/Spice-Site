import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { CreditCard, Truck, Upload, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function Checkout({ isOpen, onClose, cartItems, total, onOrderComplete }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("opay");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    notes: ""
  });
  const [proofFile, setProofFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setProofFile(file);
      toast.success("Receipt uploaded successfully!");
    }
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStep(3);
    setIsSubmitting(false);

    setTimeout(() => {
      onOrderComplete();
      onClose();
      setStep(1);
      toast.success("Order placed successfully! We'll contact you soon.");
    }, 3000);
  };

  const isFormValid = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state'];
    return required.every(field => formData[field].trim() !== '');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-orange-900">
            {step === 1 && "Shipping Information"}
            {step === 2 && "Payment Method"}
            {step === 3 && "Order Confirmation"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= stepNum ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 3 && <div className={`w-8 h-0.5 ${step > stepNum ? 'bg-orange-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="border-orange-200"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="border-orange-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-orange-200"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="border-orange-200"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="border-orange-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="border-orange-200"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="border-orange-200"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any special instructions..."
                className="border-orange-200"
              />
            </div>

            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              onClick={() => setStep(2)}
              disabled={!isFormValid()}
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-orange-600">₦{total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border border-orange-100 rounded-lg">
                    <RadioGroupItem value="opay" id="opay" />
                    <div className="flex-1">
                      <Label htmlFor="opay" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-4 w-4 text-orange-600" />
                        Opay Bank Transfer
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Transfer to our Opay account and upload proof of payment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border border-orange-100 rounded-lg">
                    <RadioGroupItem value="pod" id="pod" />
                    <div className="flex-1">
                      <Label htmlFor="pod" className="flex items-center gap-2 cursor-pointer">
                        <Truck className="h-4 w-4 text-orange-600" />
                        Pay on Delivery
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Pay when your order is delivered to your doorstep
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === "opay" && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                    <h4 className="text-sm mb-2">Opay Transfer Details:</h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>Account Name:</strong> AfriSpice Limited</p>
                      <p><strong>Account Number:</strong> 7012345678</p>
                      <p><strong>Bank:</strong> Opay</p>
                      <p><strong>Amount:</strong> ₦{total.toLocaleString()}</p>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="proof">Upload Payment Proof</Label>
                      <div className="mt-2 flex items-center gap-3">
                        <Input
                          id="proof"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="border-orange-200"
                        />
                        <Upload className="h-4 w-4 text-gray-400" />
                      </div>
                      {proofFile && (
                        <Badge variant="outline" className="mt-2 text-green-600 border-green-200">
                          ✓ {proofFile.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                onClick={handleSubmitOrder}
                disabled={paymentMethod === "opay" && !proofFile}
              >
                Place Order
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6 py-8">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                <p className="text-lg">Processing your order...</p>
              </>
            ) : (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl text-orange-900">Order Confirmed!</h3>
                  <p className="text-gray-600">
                    Thank you for your order. We'll contact you within 24 hours to confirm delivery details.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    Order ID: #AS{Date.now().toString().slice(-6)}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
