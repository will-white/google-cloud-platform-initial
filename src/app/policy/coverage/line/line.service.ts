import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable()
export class LineService {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      verified: fb.control(false),
      lineNumber: fb.control(1),
      overview: fb.group({
        type: fb.control(undefined),
        practice: fb.control(undefined),
        insuranceOptions: fb.control(undefined),
        unitOption: fb.group({
          code: fb.control(undefined),
          number: fb.group({
            basic: fb.control(undefined),
            optional: fb.control(undefined)
          })
        }),
        farmNumber: fb.control(123),
        farmName: fb.control(undefined),
        share: fb.control(undefined),
        acres: fb.control(undefined),
        planted: fb.control(undefined),
        uninsuredCodes: fb.control(undefined),
        mapArea: fb.group({
          code: fb.control(undefined),
          verified: fb.control(false)
        }),
        hasARCCoverage: fb.control(false),
        excludeFromUDO: fb.control(false),
        shareHolders: fb.control(undefined),
        skipRow: fb.group({
          code: fb.control(undefined),
          factor: fb.control(undefined),
          percentPlanted: fb.control(undefined),
          rowWidth: fb.control(undefined)
        })
      })
    });
  }
}
